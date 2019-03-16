import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { APPEND_TRADES, FETCH_LAST_TRADES } from './../actions/recent-trades.actions';
import { RecentTradesService } from 'api-services/recent-trades.service';

@Injectable()
export class RecentTradesEffects {
    @Effect()
    public recentTradesNotifier$: Observable<Action> = this.recentTradesService.observe()
        .pipe(
            map((trades) => ({
                type: APPEND_TRADES,
                payload: trades
            }))
        );

    @Effect()
    public fetchTrades$: Observable<Action> = this.actions$.pipe(
        ofType(FETCH_LAST_TRADES),
        switchMap(() => this.recentTradesService.getRecent().pipe(
                map((trades) => ({
                    type: APPEND_TRADES,
                    payload: trades
                }))
            )
        )
    );

    constructor(
        private recentTradesService: RecentTradesService,
        private actions$: Actions
    ) { }
}
