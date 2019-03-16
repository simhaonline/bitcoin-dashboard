import { OrderBook } from 'api-services/service-api.actions';

export interface OrderBookModel {
    orderbooks: { [instrument: string]: OrderBook };
}
