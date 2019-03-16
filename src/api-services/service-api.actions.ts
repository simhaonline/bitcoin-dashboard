/**
 * Connection Actions and Opcodes
 */
export enum ApiActions {
    Test = '/api/v1/public/test',
    Ping = '/api/v1/public/ping',
    GetInstruments = '/api/v1/public/getinstruments',
    Index = '/api/v1/public/index',
    GetCurrencies = '/api/v1/public/getcurrencies',
    GetOrderbook = '/api/v1/public/getorderbook',
    GetLastTrades = '/api/v1/public/getlasttrades',
    GetSummary = '/api/v1/public/getsummary',
    Stats = '/api/v1/public/stats',
    GetAnnouncements = '/api/v1/public/getannouncements',
    Subscribe = '/api/v1/private/subscribe',
    Unsubscribe = '/api/v1/private/unsubscribe',
    Account = '/api/v1/private/account',
    Buy = '/api/v1/private/buy',
    Sell = '/api/v1/private/sell',
    Edit = '/api/v1/private/edit',
    Cancel = '/api/v1/private/cancel',
    CancelAll = '/api/v1/private/cancelall',
    GetOpenOrders = '/api/v1/private/getopenorders',
    Positions = '/api/v1/private/positions',
    OrderHistory = '/api/v1/private/orderhistory',
    OrderState = '/api/v1/private/orderstate',
    TradeHistory = '/api/v1/private/tradehistory',
    NewAnnouncements = '/api/v1/private/newannouncements'
}

export enum ApiMessages {
    AuthorizationRequired = 'authorization_required',
    UnknownError = 'unknown_error',
    TradeEvent = 'trade_event',
    MyTradeEvent = 'my_trade_event',
    OrderBookEvent = 'order_book_event',
    UserOrderEvent = 'user_order_event',
    Announcements = 'announcements',
    Index = 'index',
    Subscribed = 'subscribed',
    Unsubscribed = 'unsubscribed'
}

export enum ApiNotificationHooks {
    OrderBook = 'order_book',
    Trade = 'trade',
    UserOrder = 'user_order',
    MyTrade = 'my_trade',
    Announcements = 'announcements',
    Portfolio = 'portfolio',
    Deliver = 'delivery',
    Index = 'index'
}

/**
 * Api Result Types
 */
export interface AccountResult {
    equity: number;
    maintenanceMargin: number;
    initialMargin: number;
    availableFunds: number;
    balance: number;
    depositAddress: string;
    SUPL: number;
    SRPL: number;
    PNL: number;
    optionsPNL: number;
    optionsSUPL: number;
    optionsSRPL: number;
    optionsD: number;
    optionsG: number;
    optionsV: number;
    optionsTh: number;
    futuresPNL: number;
    futuresSUPL: number;
    futuresSRPL: number;
    deltaTotal: number;
}

export interface Trade {
    tradeId: number;
    instrument: string;
    timeStamp: number;
    tradeSeq: number;
    quantity: number;
    price: number;
    direciton: string;
    tickDirection: number;
    indexPrice: number;
}

export interface Instrument {
    kind: 'future' | 'option';
    instrumentName: string;
    baseCurrency: string;
    currency: string;
    minTradeSize: number;
    isActive: boolean;
    settlement: string;
    created: string | Date;
    expiration: string | Date;
    pricePrecision: number;
}

export interface BidAsk {
    quantity: number;
    price: number;
    cm: number;
}

export interface OrderBook {
    bids: BidAsk[];
    asks: BidAsk[];
    instrument: string;
    last: number;
    low: number;
    high: number;
    mark: number;
    min: number;
    max: number;
    settlementPrice: number;
    state: 'open' | 'closed';
    tstamp: number;
}
