import { Action } from '@ngrx/store';

import { BtcIndexModel } from './../models/btc-index.model';

export const UPDATE_INDEX   = '[BTC-INDEX] UpdateIndex';

export class UpdateIndex implements Action {
    public readonly type = UPDATE_INDEX;

    constructor(public payload: BtcIndexModel) {}
}

export type Actions = UpdateIndex;
