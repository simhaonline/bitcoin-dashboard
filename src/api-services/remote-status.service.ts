import { Injectable } from '@angular/core';
import { Observable, interval, combineLatest, of } from 'rxjs';

import { ServiceConnection } from 'core/serviceConnection';
import { MessageOutput } from 'core/connection.interface';
import { ApiActions } from './service-api.actions';
import { startWith, switchMap, map, tap, mergeMap } from 'rxjs/operators';

export interface RemoteStatus {
    time: number;
    connected: boolean;
}

const STATUS_UPDATE_INTERVAL = 1000;

@Injectable()
export class RemoteStatusApiService {
    private initialTime?: number = null;

    constructor(
        private connection: ServiceConnection
    ) { }

    /**
     * Provides a stream of Service connection status
     */
    public observe(): Observable<RemoteStatus> {
        // Fetch the current service time from the Test method
        // and mark it as connected when successfull
        const remoteStatus$ = interval(STATUS_UPDATE_INTERVAL)
            .pipe(
                startWith(0),
                switchMap(
                    () => this.connection.callRaw(ApiActions.Test)
                        .pipe(
                            map<MessageOutput, RemoteStatus>((value) => ({
                                connected: true,
                                time: Math.round(value.usOut / 1000)
                            }))
                        )
                ),
                tap((val) => {
                    if (!this.initialTime) {
                        this.initialTime = val.time;
                    }
                })
            );

        // Ticks every second
        const timeTick$ = interval(1000).pipe(
            startWith(0)
        );

        // Combine the observers and calculate the
        // server time by adding ticks count to initial time
        return combineLatest(remoteStatus$, timeTick$).pipe(
            switchMap(([stats, tick]) => of<RemoteStatus>({
                time: this.initialTime ? this.initialTime + tick * 1000 : stats.time,
                connected: stats.connected
            }))
        );
    }
}
