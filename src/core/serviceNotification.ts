import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as _ from 'lodash';

import { ServiceConnectionFactory } from './serviceConnectionFactory';
import { ServiceConnection } from './serviceConnection';
import { MessageOutput } from './connection.interface';
import { ApiActions, ApiMessages } from 'api-services/service-api.actions';

export interface NotificationEntry {
    message: string;
    result: any;
    success: boolean;
    testnet?: boolean;
}

export interface NotificationMessage {
    notifications: NotificationEntry[];
    msOut?: number;
    subscribtionStarted?: boolean;
}

export class ServiceNotification {
    private _connection: ServiceConnection;

    constructor(
        connectionFactory: ServiceConnectionFactory
    ) {
        this._connection = connectionFactory.create();
    }

    public bind(
        messagesToBind: string[],
        instrument: Object = ['all']
    ): Observable<NotificationMessage> {
        return this._connection.callRaw(
            ApiActions.Subscribe,
            {
                instrument,
                event: messagesToBind
            },
            true
        ).pipe(
            mergeMap(
                (msg: MessageOutput) => {
                    if (msg.notifications) {
                        return of<NotificationMessage>({
                            ...msg,
                            notifications: msg.notifications as NotificationEntry[],
                        });
                    } else {
                        return of<NotificationMessage>({
                            notifications: [],
                            subscribtionStarted: true
                        });
                    }
                }
            )
        );
    }

    public stop() {
        const stopPromise = new Promise((resolve, reject) => {
            const sub = this._connection.callRaw(
                ApiActions.Unsubscribe
            ).subscribe(
                (result: MessageOutput) => {
                    if (result.message === ApiMessages.Unsubscribed) {
                        resolve();
                    }
                },
                () => { reject(); },
                () => { sub.unsubscribe(); }
            );
        });

        return stopPromise;
    }
}
