import * as BtcIndexActions from './../actions/btc-index.actions';
import { BtcIndexModel } from './../models/btc-index.model';

const initialState: BtcIndexModel = {
    value: null,
    valueDiff: null,
    edp: null
};

export function reducer(state: BtcIndexModel = initialState, action: BtcIndexActions.Actions) {
    switch (action.type) {
        case BtcIndexActions.UPDATE_INDEX:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
