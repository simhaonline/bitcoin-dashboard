import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import {
    FETCH_CURRENT_INSTRUMENTS,
    UPDATE_CURRENT_INSTRUMENTS
} from './../actions/instruments.actions';
import { InstrumentsApiService } from 'api-services/instruments.service';
import { Instrument } from 'api-services/service-api.actions';

@Injectable()
export class InstrumentsEffects {
    @Effect()
    public $currentInstruments: Observable<Action> = this.actions$.pipe(
        ofType(FETCH_CURRENT_INSTRUMENTS),
        switchMap(() => this.instrumentsApiService.getInstruments().pipe(
                map((instruments: Instrument[]) => ({
                    type: UPDATE_CURRENT_INSTRUMENTS,
                    payload: instruments
                }))
            )
        )
    );

    constructor(
        private instrumentsApiService: InstrumentsApiService,
        private actions$: Actions
    ) { }
}
