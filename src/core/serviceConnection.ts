import { Injectable } from '@angular/core';
import { Observable, Subject, of, throwError } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { filter, mergeMap, map } from 'rxjs/operators';
import uuid from 'uuid';
import moment from 'moment';
import qs from 'query-string';
import _ from 'lodash';
import CryptoJs from 'crypto-js';

import { Config } from './config';
import { ApiMessages } from 'api-services/service-api.actions';
import { MessageOutput } from './connection.interface';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ServiceConnection {
    private s: Subject<MessageOutput | string>;

    private get socket() {
        if (!this.s) {
            this.s = webSocket<MessageOutput | string>(this.config.apiWsUrl);
        }
        return this.s;
    }

    constructor(
        private config: Config,
        private authService: AuthenticationService
    ) { }

    public callRaw(action: string, args?: object, unfiltered?: boolean) {
        const id = uuid.v4();
        const frame = {
            id,
            action,
            arguments: args,
        };
        // TODO: if is authenticated
        if (this.authService.isLoggedIn) {
            Object.assign(frame, { sig: this.generateToken(action, args) });
        }

        this.socket.next(frame);

        return this.socket.pipe(
            filter((msg: MessageOutput) => unfiltered || msg.id === id),
            mergeMap((val: MessageOutput) => {
                if (val.success === false) {
                    return throwError({
                        code: val.error || 0,
                        message: val.message || ApiMessages.UnknownError
                    });
                }
                return of(val);
            })
        );
    }

    public call(action: string, args?: object) {
        return this.callRaw(action, args).pipe(
            map<MessageOutput | string, any>((msg: MessageOutput) => msg.result)
        );
    }

    private generateToken(action: string, args?: object) {
        const ts = moment.utc().valueOf();
        const tokenStruct = {
            _: ts,
            _ackey: this.authService.key,
            _acsec: this.authService.secret,
            _action: action,
        };
        if (args) {
            const adjustedArgs = _.chain(args)
                .keys()
                .sort()
                .reduce((obj: object, key: string) => {
                    const val = args[key];

                    obj[key] = _.isArray(val) ?
                        (val as string[]).join('') :
                        val;

                    return obj;
                }, {})
                .value();

            Object.assign(tokenStruct, adjustedArgs);
        }
        const tokenQueryString = qs.stringify(tokenStruct, { encode: false });
        const hashString = CryptoJs.SHA256(tokenQueryString).toString(CryptoJs.enc.Base64);
        const output = `${this.authService.key}.${ts}.${hashString}`;

        return output;
    }
}
