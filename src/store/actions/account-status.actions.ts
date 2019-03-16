import { Action } from '@ngrx/store';

import { AccountStatusModel } from './../models/account-status.model';

export const UPDATE_ACCOUNT = '[ACCOUNT-STATUS] UpdateAccount';
export const FETCH_ACCOUNT  = '[ACCOUNT-STATUS] FetchAccount';

export class UpdateAccount implements Action {
    public readonly type = UPDATE_ACCOUNT;

    constructor(public payload: AccountStatusModel) { }
}

export class FetchAccount implements Action {
    public readonly type = FETCH_ACCOUNT;
}

export type Actions = UpdateAccount | FetchAccount;
