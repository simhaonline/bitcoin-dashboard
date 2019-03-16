import { Injectable } from '@angular/core';
import { Config } from './config';

export interface UserData {
    email: string;
    userName: string;
}

@Injectable()
export class AuthenticationService {
    get key() {
        return this._config.apiKey;
    }

    get secret() {
        return this._config.apiSecret;
    }

    public isLoggedIn: boolean = true;
    public get loggedUser(): UserData {
        return this._loggedUser;
    }

    private _loggedUser: UserData = {
        email: 'maciej.kurbasnki@outlook.com',
        userName: 'unski11ed.6502'
    };

    constructor(
        private _config: Config
    ) { }
}
