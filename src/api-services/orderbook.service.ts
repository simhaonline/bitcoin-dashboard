import { Injectable } from '@angular/core';
import { Observable, from, empty } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
    ApiNotificationHooks,
    OrderBook
} from './service-api.actions';

@Injectable()
export class OrderBookApiService {
    private _notifications: ServiceNotification;

    constructor(
        _notificationsFactory: ServiceNotificationFactory,
        private _connection: ServiceConnection
    ) {
        this._notifications = _notificationsFactory.get();
    }

    /**
     * Returns an Observable which fetches the data
     * of the desired instrument
     * @param instrument id of the instrument
     */
    public get(instrument?: string): Observable<OrderBook> {
        const config = instrument ?
            { instrument } : {};

        return this._connection.call(ApiActions.GetOrderbook, config);
    }

    /**
     * Returns an Observable which provides
     * the current OrderBook data
     */
    public observe(): Observable<OrderBook> {
        return this._notifications.bind([ApiNotificationHooks.OrderBook]).pipe(
            switchMap<NotificationMessage, OrderBook> (
                (msg: NotificationMessage) => _.isEmpty(msg.notifications) ?
                    empty() :
                    from(msg.notifications)
                        .pipe(
                            map((notification: NotificationEntry) => notification.result as OrderBook)
                        )
            )
        )
    }
}
