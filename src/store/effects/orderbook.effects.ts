import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import {
    UPDATE_ORDER_BOOK,
    FETCH_ORDER_BOOK,
    ADD_ORDER_BOOK,

    FetchOrderBook
} from './../actions/orderbook.actions';
import { OrderBookApiService } from 'api-services/orderbook.service';

@Injectable()
export class OrderBookEffects {
    @Effect()
    public orderBookUpdates$: Observable<Action> = this.orderBookService.observe()
        .pipe(
            map((orderbook) => ({
                type: UPDATE_ORDER_BOOK,
                payload: orderbook
            }))
        );

    @Effect()
    public fetchOrderBooks$: Observable<Action> = this.actions$.pipe(
        ofType(FETCH_ORDER_BOOK),
        switchMap((action: FetchOrderBook) =>
            this.orderBookService.get(action.payload.instrument).pipe(
                map((orderbook) => ({
                    type: ADD_ORDER_BOOK,
                    payload: orderbook
                }))
            )
        )
    );

    constructor(
        private orderBookService: OrderBookApiService,
        private actions$: Actions
    ) { }
}
