export * from './tradingView.component';

export interface Data {
    s: string;
    t: number[];
    v: string[];
    o: string[];
}

export interface Subscription {
    resolution: string;
    symbolInfo: string;
    listeners: Function[];
    lastBarTime: number;
}

export enum ChartType {
    Candles = 1
}

export enum DataResult {
    NoData = 'no_data',
    Ok = 'ok',
    Error = 'error'
}
