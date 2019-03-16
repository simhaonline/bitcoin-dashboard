import { Action } from '@ngrx/store';

import { Instrument } from 'api-services/service-api.actions';

export const UPDATE_CURRENT_INSTRUMENTS = '[INSTRUMENTS] UpdateCurrentInstruments';
export const FETCH_CURRENT_INSTRUMENTS  = '[INSTRUMENTS] FetchCurrentInstruments';

export class UpdateCurrentInstruments implements Action {
    public readonly type = UPDATE_CURRENT_INSTRUMENTS;

    constructor(public payload: Instrument[]) { }
}

export class FetchCurrentInstruments implements Action {
    public readonly type = FETCH_CURRENT_INSTRUMENTS;
}

export type Actions = UpdateCurrentInstruments | FetchCurrentInstruments;
