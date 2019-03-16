import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import _ from 'lodash';

import { ServiceConnection } from 'core/serviceConnection';
import { ServiceNotificationFactory } from 'core/servicetNotificationFactory';
import { ServiceNotification, NotificationMessage } from 'core/serviceNotification';
import { ApiActions, ApiNotificationHooks } from 'api-services/service-api.actions';
import { Trade } from 'api-services/service-api.actions';

export interface GetRecentQueryParams {
    instrument?: string;
    since?: string;
    count?: string;
}

@Injectable()
export class RecentTradesService {
    private serviceNotification: ServiceNotification;

    constructor(
        private serviceConnection: ServiceConnection,
        serviceNotificationFactory: ServiceNotificationFactory
    ) {
        this.serviceNotification = serviceNotificationFactory.get();
    }

    public getRecent(params?: GetRecentQueryParams): Observable<Trade[]> {
        const options = {
            instrument: 'all',
            ...(params || { })
        };

        return this.serviceConnection.call(
            ApiActions.GetLastTrades,
            options
        ) as Observable<Trade[]>;
    }

    /**
     * Provides a stream of recent trades
     */
    public observe(): Observable<Trade[]> {
        const newTrades = this.serviceNotification
            .bind([ApiNotificationHooks.Trade])
            .pipe(
                mergeMap<NotificationMessage, Trade[]>((msg) =>
                    of(_.reduce(
                        msg.notifications,
                        (trades: Trade[], notification) =>
                            _.concat(trades, notification.result as Trade[]),
                        []
                    ))
                )
            );

        return newTrades;
    }

    /**
     * Stops observing for new trades
     */
    public destroy() {
        this.serviceNotification.stop();
    }
}
