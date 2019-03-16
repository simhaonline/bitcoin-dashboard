import { Injectable } from '@angular/core';
import { Config } from './config';
import { ServiceConnection } from './serviceConnection';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ServiceConnectionFactory {
    constructor(
        private authService: AuthenticationService,
        private config: Config
    ) { }

    public create() {
        return new ServiceConnection(this.config, this.authService);
    }
}
