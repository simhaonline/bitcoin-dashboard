import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect } from '@ngrx/effects';

import { UPDATE_STATUS } from './../actions/remote-status.actions';
import { RemoteStatusApiService, RemoteStatus } from 'api-services/remote-status.service';

@Injectable()
export class RemoteStatusEffects {
    @Effect()
    public remoteStatus$: Observable<Action> = this.currencyIndexService.observe()
        .pipe(
            map((status: RemoteStatus) => ({
                type: UPDATE_STATUS,
                payload: {
                    connected: status.connected,
                    serverTime: new Date(status.time)
                }
            }))
        );

    constructor(
        private currencyIndexService: RemoteStatusApiService
    ) { }
}
