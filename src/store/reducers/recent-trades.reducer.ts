import _ from 'lodash';

import * as RecentTradesActions from 'store/actions/recent-trades.actions';

import { RecentTradesModel } from './../models/recent-trades.model';

const initialState: RecentTradesModel = {
    list: [],
    maxLength: 50
};

export function reducer(state = initialState, action: RecentTradesActions.Actions ) {
    switch (action.type) {
        case RecentTradesActions.APPEND_TRADES: {
            // Merge and sort by `seq`
            const newList = _.chain(state.list)
                .merge(action.payload)
                .sort((tradeA, tradeB) => tradeB.tradeSeq - tradeA.tradeSeq)
                .take(state.maxLength)
                .value();

            return {
                ...state,
                list: newList
            };
        }

        default: {
            return state;
        }
    }
}
