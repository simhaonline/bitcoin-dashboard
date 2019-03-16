import { BtcIndexEffects } from 'store/effects/btc-index.effects';
import { RemoteStatusEffects } from 'store/effects/remote-status.effects';
import { AccountStatusEffects } from 'store/effects/account-status.effects';
import { RecentTradesEffects } from 'store/effects/recent-trades.effects';
import { InstrumentsEffects } from 'store/effects/instruments.effects';
import { OrderBookEffects } from 'store/effects/orderbook.effects';

export const effects = [
    BtcIndexEffects,
    RemoteStatusEffects,
    AccountStatusEffects,
    RecentTradesEffects,
    InstrumentsEffects,
    OrderBookEffects
];
