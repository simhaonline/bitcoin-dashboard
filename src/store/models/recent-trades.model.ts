import { Trade } from 'api-services/service-api.actions';

export interface RecentTradesModel {
    list: Trade[];
    maxLength: number;
}
