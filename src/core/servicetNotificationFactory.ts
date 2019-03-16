import { Injectable } from '@angular/core';
import { ServiceConnectionFactory } from './serviceConnectionFactory';
import { ServiceNotification } from './serviceNotification';

@Injectable()
export class ServiceNotificationFactory {
    constructor(
        private _connectionFactory: ServiceConnectionFactory
    ) { }

    public get(): ServiceNotification {
        return new ServiceNotification(this._connectionFactory);
    }
}
