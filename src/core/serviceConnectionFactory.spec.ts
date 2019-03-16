import { Config } from './config';
import { ServiceConnectionFactory } from './serviceConnectionFactory';
import { AuthenticationService } from './authentication.service';

describe('ServiceConnectionFactory', () => {
    const config = new Config();
    const authService = new AuthenticationService(config);

    const serviceConnectionFactory = new ServiceConnectionFactory(authService, config);

    it('should be able to create multiple different instances', () => {
        const connectionA = serviceConnectionFactory.create();
        const connectionB = serviceConnectionFactory.create();

        expect(connectionA).not.toBe(connectionB);
    });
});
