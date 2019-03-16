import _ from 'lodash';

import * as OrderBookActions from './../actions/orderbook.actions';

import { OrderBookModel } from './../models/orderbook.model';

const initialState: OrderBookModel = {
    orderbooks: { }
};

export function reducer(state = initialState, action: OrderBookActions.Actions ): OrderBookModel {
    switch (action.type) {
        case OrderBookActions.ADD_ORDER_BOOK: {
            const { instrument } = action.payload;

            return {
                ...state,
                orderbooks: _.merge(state.orderbooks, {
                    [instrument]: action.payload
                })
            };
        }

        case OrderBookActions.UPDATE_ORDER_BOOK: {
            const { instrument } = action.payload;

            if (state.orderbooks[instrument]) {
                return {
                    ...state,
                    orderbooks: _.mapValues(state.orderbooks, (orderbook, index) => {
                        if (index === instrument) {
                            return action.payload;
                        }
                        return orderbook;
                    })
                };
            }

            return state;
        }

        default: {
            return state;
        }
    }
}
