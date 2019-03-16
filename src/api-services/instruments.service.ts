import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConnection } from 'core/serviceConnection';
import { ApiActions, Instrument } from './service-api.actions';
import _ from 'lodash';
import { map } from 'rxjs/operators';

@Injectable()
export class InstrumentsApiService {
    constructor(
        private _connection: ServiceConnection
    ) { }

    /**
     * Fetches the Instruments from the Service
     * @param includeExpired should expired instruments also be fetched
     */
    public getInstruments(includeExpired = false): Observable<Instrument[]> {
        return this._connection.call(
            ApiActions.GetInstruments,
            {
                expired: includeExpired
            }
        ).pipe(
            // Ensure the received instrument dates
            // are as Date objects, not strings
            map((instruments: Instrument[]) =>
                _.map(instruments, (instrument) => ({
                    ...instrument,
                    created: typeof instrument.created === 'string' ?
                        new Date(instrument.created) : instrument.created,
                    expiration: typeof instrument.expiration === 'string' ?
                        new Date(instrument.expiration) : instrument.expiration
                }))
            )
        );
    }
}
