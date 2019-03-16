import { filter, first } from 'rxjs/operators';

import { Config } from './config';
import { ServiceConnectionFactory } from './serviceConnectionFactory';
import { AuthenticationService } from './authentication.service';
import { ApiActions, ApiNotificationHooks } from './../api-services/service-api.actions';
import { MessageError } from './connection.interface';
import { ServiceNotification } from './serviceNotification';

describe('ServiceNotification', () => {
    const config = new Config();
    const authService = new AuthenticationService(config);
    const serviceConnectionFactory = new ServiceConnectionFactory(authService, config);
    const serviceNotification = new ServiceNotification(serviceConnectionFactory);

    it('calling #bind should provide working Notifications Observable', (done: DoneFn) => {
        serviceNotification.bind([ApiNotificationHooks.OrderBook])
            .pipe(
                filter((data) => !data.subscribtionStarted)
            )
            .subscribe((data) => {
                expect(data.notifications).toBeDefined();
                expect(data.msOut).toBeDefined();

                done();
            });
    }, 2000);

    it('calling another #bind should work on other message type', (done: DoneFn) => {
        serviceNotification.bind([ApiNotificationHooks.OrderBook])
            .pipe(
                filter((data) => !data.subscribtionStarted)
            )
            .subscribe((data) => {
                expect(data.notifications).toBeDefined();
                expect(data.msOut).toBeDefined();

                done();
            });
    }, 2000);

    it('should #stop without errors', (done: DoneFn) => {
        serviceNotification.stop()
            .then(() => {
                expect(true).toBe(true);

                done();
            })
            .catch(() => {
                done();
            });
    });

    it('should emmit a first value with empty notifications on #bind', (done: DoneFn) => {
        const tradeNotification = new ServiceNotification(serviceConnectionFactory);

        tradeNotification.bind([ApiNotificationHooks.Trade])
            .pipe(
                first()  
            )
            .subscribe((data) => {
                expect(data.notifications).toBeDefined();
                expect(data.subscribtionStarted).toBe(true);
                expect(data.notifications.length).toBe(0);

                tradeNotification.stop();

                done();
            });
    });
});
