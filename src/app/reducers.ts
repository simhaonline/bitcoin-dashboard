import { reducer as btcIndexReducer } from 'store/reducers/btc-index.reducer';
import { reducer as remoteStatusReducer } from 'store/reducers/remote-status.reducer';
import { reducer as accountStatusReducer } from 'store/reducers/account-status.reducer';
import { reducer as recentTradesReducer } from 'store/reducers/recent-trades.reducer';
import { reducer as instrumentsReducer } from 'store/reducers/instruments.reducer';
import { reducer as orderBookReducer } from 'store/reducers/orderbook.reducer';

export const reducers = {
    btcIndex: btcIndexReducer,
    remoteStatus: remoteStatusReducer,
    accountStatus: accountStatusReducer,
    recentTrades: recentTradesReducer,
    instruments: instrumentsReducer,
    orderBook: orderBookReducer
};
