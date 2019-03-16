import { AccountInfoApiService } from './account-info.service';
import { CurrencyIndexApiService } from './currency-index.service';
import { RemoteStatusApiService } from './remote-status.service';
import { RecentTradesService } from './recent-trades.service';
import { InstrumentsApiService } from './instruments.service';
import { OrderBookApiService } from './orderbook.service';

export const apiServices = [
    AccountInfoApiService,
    CurrencyIndexApiService,
    RemoteStatusApiService,
    RecentTradesService,
    InstrumentsApiService,
    OrderBookApiService
];
