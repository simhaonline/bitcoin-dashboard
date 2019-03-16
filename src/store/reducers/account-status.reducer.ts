import * as AccountStatusActions from './../actions/account-status.actions';
import { AccountStatusModel } from './../models/account-status.model';

const initialState: AccountStatusModel = {
    equity: 0,
    maintenanceMargin: 0,
    initialMargin: 0,
    availableFunds: 0,
    balance: 0,
    depositAddress: '',
    SUPL: 0,
    SRPL: 0,
    PNL: 0,
    optionsPNL: 0,
    optionsSUPL: 0,
    optionsSRPL: 0,
    optionsD: 0,
    optionsG: 0,
    optionsV: 0,
    optionsTh: 0,
    futuresPNL: 0,
    futuresSUPL: 0,
    futuresSRPL: 0,
    deltaTotal: 0
};

export function reducer(
    state: AccountStatusModel = initialState,
    action: AccountStatusActions.Actions
) {
    switch (action.type) {
        case AccountStatusActions.UPDATE_ACCOUNT:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
