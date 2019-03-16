import { Config } from './config';
import { ServiceConnection } from './serviceConnection';
import { AuthenticationService } from './authentication.service';
import { ApiActions, ApiMessages } from 'api-services/service-api.actions';
import { MessageError } from './connection.interface';
import { Subscription } from 'rxjs';

describe('ServiceConnection', () => {
    const config = new Config();
    const authService = new AuthenticationService(config);
    const serviceConnection = new ServiceConnection(config, authService);

    let subA: Subscription;
    let subB: Subscription;
    let subC: Subscription;
    let subD: Subscription;
    let subE: Subscription;

    authService.isLoggedIn = false;

    it('using #callRaw to PING should return a raw ws Message via Stream', (done: DoneFn) => {
        subA = serviceConnection.callRaw(ApiActions.Ping).subscribe((message) => {
            expect(message.id).toBeDefined('id');
            expect(message.result).toBe('pong');

            done();
        });
    }, 2000);

    it('using #call to PING should return a PONG message via Stream', (done: DoneFn) => {
        subB = serviceConnection.call(ApiActions.Ping).subscribe((message: string) => {
            expect(message).toBe('pong');

            done();
        });
    }, 2000);

    it('should emit an error when a private call is made not authenticated', (done: DoneFn) => {
        subC = serviceConnection.call(ApiActions.Account).subscribe(
            (message: string) => { return; },
            (error: MessageError) => {
                expect(error.code).toBeDefined();
                expect(error.message).toBe(ApiMessages.AuthorizationRequired);

                done();
            }
        );
    }, 2000);

    it('should receive data from private call when authenticated', (done: DoneFn) => {
        authService.isLoggedIn = true;

        subD = serviceConnection.call(ApiActions.Account)
            .subscribe((account) => {
                expect(account.balance).toBeDefined();

                done();
            });
    }, 2000);

    it('should receive data from private call with args when authenticated', (done: DoneFn) => {
        authService.isLoggedIn = true;

        subE = serviceConnection.call(ApiActions.Account, {
            count: 5,
            instrument: 'BTC-29JUN18'
        }).subscribe((account) => {
            expect(account.balance).toBeDefined();

            done();
        });
    }, 2000);

    afterAll(() => {
        subA.unsubscribe();
        subB.unsubscribe();
        subC.unsubscribe();
        subD.unsubscribe();
        subE.unsubscribe();
    });
});
