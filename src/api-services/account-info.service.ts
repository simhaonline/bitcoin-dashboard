import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServiceConnection } from 'core/serviceConnection';
import { ApiActions, AccountResult } from './service-api.actions';

@Injectable()
export class AccountInfoApiService {
    constructor(
        private _connection: ServiceConnection
    ) { }

    /**
     * Fetches current Account information
     */
    public getInfo(): Observable<AccountResult> {
        return this._connection.call(ApiActions.Account);
    }
}
