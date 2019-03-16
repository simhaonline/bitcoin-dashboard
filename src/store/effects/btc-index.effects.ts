import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect } from '@ngrx/effects';

import { UPDATE_INDEX } from './../actions/btc-index.actions';
import { CurrencyIndexApiService, CurrencyIndex } from 'api-services/currency-index.service';

@Injectable()
export class BtcIndexEffects {
    @Effect()
    public btcIndex$: Observable<Action> = this.currencyIndexService.observe()
        .pipe(
            map((index: CurrencyIndex) => ({
                type: UPDATE_INDEX,
                payload: index.btc
            }))
        );

    constructor(
        private currencyIndexService: CurrencyIndexApiService
    ) { }
}
