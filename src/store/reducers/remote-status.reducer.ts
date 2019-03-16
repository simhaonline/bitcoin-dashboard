import * as RemoteStatusActions from './../actions/remote-status.actions';
import { RemoteStatusModel } from './../models/remote-status.model';

const initialState: RemoteStatusModel = {
    connected: false,
    serverTime: null
};

export function reducer(
    state: RemoteStatusModel = initialState,
    action: RemoteStatusActions.Actions
) {
    switch (action.type) {
        case RemoteStatusActions.UPDATE_STATUS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
