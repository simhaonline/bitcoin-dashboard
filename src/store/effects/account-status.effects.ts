import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { FETCH_ACCOUNT, UPDATE_ACCOUNT } from './../actions/account-status.actions';
import { AccountInfoApiService } from 'api-services/account-info.service';
import { AccountResult } from 'api-services/service-api.actions';

@Injectable()
export class AccountStatusEffects {
    @Effect()
    public $accountStatus: Observable<Action> = this.actions$.pipe(
        ofType(FETCH_ACCOUNT),
        switchMap(() => this.accountApiService.getInfo().pipe(
                map((accountData: AccountResult) => ({
                    type: UPDATE_ACCOUNT,
                    payload: accountData
                }))
            )
        )
    );

    constructor(
        private accountApiService: AccountInfoApiService,
        private actions$: Actions
    ) { }
}
