import { Injectable } from '@angular/core';
import { Observable, of, from, interval, combineLatest} from 'rxjs';
import { switchMap, map, startWith, tap } from 'rxjs/operators';
import _ from 'lodash';

import { ServiceConnection } from 'core/serviceConnection';
import { ServiceNotificationFactory } from 'core/servicetNotificationFactory';
import {
    ServiceNotification,
    NotificationMessage,
    NotificationEntry
} from 'core/serviceNotification';
import {
    ApiActions,
    ApiNotificationHooks
} from './service-api.actions';

export interface CurrencyIndex {
    btc: {
        value?: number,
        valueDiff?: number,
        edp?: number
    };
}

const CURRENCY_UPDATE_INTERVAL = 1000;

@Injectable()
export class CurrencyIndexApiService {
    private lastIndexVal?: number = null;
    private notifications: ServiceNotification;

    constructor(
        notificationsFactory: ServiceNotificationFactory,
        private connection: ServiceConnection
    ) {
        this.notifications = notificationsFactory.get();
    }

    /**
     * Provides a stream of CurrencyIndex updates
     */
    public observe(): Observable<CurrencyIndex> {
        // Observe service notification index and transform the
        // data to a CurrencyIndex
        // (Currently service is not providing the notifications)
        const indexNotification$ = this.notifications
            .bind([ApiNotificationHooks.Index])
            .pipe(
                switchMap<NotificationMessage, CurrencyIndex>(
                    (msg) => _.isEmpty(msg.notifications) ?
                        of({ btc: { } }) :
                        from(msg.notifications).pipe(
                            map<NotificationEntry, CurrencyIndex>(({ result }) => ({
                                btc: {
                                    value: result.btc,
                                    valueDiff: 0,
                                    edp: result.edp
                                }
                            }))
                        )
                )
            );
        // Fetch current index every CURRENCY_UPDATE_INTERVAL
        // milliseconds
        const index$ = interval(CURRENCY_UPDATE_INTERVAL)
            .pipe(
                startWith(0),
                switchMap<number, any>(
                    () => this.connection.call(ApiActions.Index)
                )
            )

        // Combine the above Observables and map them to CurrencyIndex
        return combineLatest(index$, indexNotification$).pipe(
            switchMap(([index, notification]) => of<CurrencyIndex>({
                btc: {
                    value: notification.btc.value || index.btc,
                    valueDiff: this.lastIndexVal ?
                        (notification.btc.valueDiff || index.btc - this.lastIndexVal) :
                        0,
                    edp: notification.btc.edp
                }
            })),
            // Side effect: save value for future diff calculations
            tap((value) => {
                this.lastIndexVal = value.btc.value;
            })
        );
    }
}
