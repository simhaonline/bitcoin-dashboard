import * as InstrumentsActions from './../actions/instruments.actions';

import { InstrumentsModel } from './../models/instruments.model';

const initialState: InstrumentsModel = {
    currentInstruments: []
};

export function reducer(
    state = initialState,
    action: InstrumentsActions.Actions
): InstrumentsModel {
    switch (action.type) {
        case InstrumentsActions.UPDATE_CURRENT_INSTRUMENTS: {
            return {
                ...state,
                currentInstruments: action.payload
            };
        }

        default: {
            return state;
        }
    }
}
