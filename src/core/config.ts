import { Injectable } from '@angular/core';

import development from './../../development.json';
import production from './../../production.json';

export interface ConfigJson {
    apiWsUrl: string;
    apiKey: string;
    apiSecret: string;
}

@Injectable()
export class Config {
    private get _config(): ConfigJson {
        return process.env.NODE_ENV === 'production' ? production : development;
    }

    get apiWsUrl() { return this._config.apiWsUrl; }
    get apiKey() { return this._config.apiKey; }
    get apiSecret() { return this._config.apiSecret; }
}
