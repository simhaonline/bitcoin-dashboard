import { BtcIndexModel } from './models/btc-index.model';
import { AccountStatusModel } from './models/account-status.model';
import { RemoteStatusModel } from './models/remote-status.model';
import { RecentTradesModel } from './models/recent-trades.model';
import { InstrumentsModel } from './models/instruments.model';
import { OrderBookModel } from './models/orderbook.model';

export interface AppState {
    readonly btcIndex: BtcIndexModel;
    readonly accountStatus: AccountStatusModel;
    readonly remoteStatus: RemoteStatusModel;
    readonly recentTrades: RecentTradesModel;
    readonly instruments: InstrumentsModel;
    readonly orderBook: OrderBookModel;
}
