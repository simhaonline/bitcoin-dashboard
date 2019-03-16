import { Action } from '@ngrx/store';

import { OrderBook } from 'api-services/service-api.actions';

export const FETCH_ORDER_BOOK   = '[ORDER-BOOK] FetchOrderBook';
export const ADD_ORDER_BOOK    = '[ORDER-BOOK] AddOrderBooks';
export const UPDATE_ORDER_BOOK  = '[ORDER-BOOK] UpdateOrderBook';

export interface FetchPayload {
    instrument?: string;
}

export class FetchOrderBook implements Action {
    public readonly type = FETCH_ORDER_BOOK;

    constructor(public payload: FetchPayload) { }
}

export class AddOrderBook implements Action {
    public readonly type = ADD_ORDER_BOOK;

    constructor(public payload: OrderBook) { }
}

export class UpdateOrderBook implements Action {
    public readonly type = UPDATE_ORDER_BOOK;

    constructor(public payload: OrderBook) { }
}

export type Actions = FetchOrderBook | AddOrderBook | UpdateOrderBook;
