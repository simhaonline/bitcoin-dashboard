import { Action } from '@ngrx/store';

import { Trade } from 'api-services/service-api.actions';

export const APPEND_TRADES      = '[RECENT-TRADES] AppendTrades';
export const FETCH_LAST_TRADES  = '[RECENT-TRADES] FetchLastTrades';

export class AppendTrades implements Action {
    public readonly type = APPEND_TRADES;

    constructor(public payload: Trade[]) { }
}

export class FetchLastTrades implements Action {
    public readonly type = FETCH_LAST_TRADES;
}

export type Actions = AppendTrades;
