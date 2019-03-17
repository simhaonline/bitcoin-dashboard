import moment from 'moment';
import queryString from 'query-string';
import _ from 'lodash';

import resolutionToDuration from './resolutionToDuration';
import FtuDataPulseUpdater from './FtuDataPulseUpdater';

import {
    ChartType,
    DataResult
} from '.';

export default class FtuDataFeed {
    public symbolSearch?: any = null;
    public barsPulseUpdater?: FtuDataPulseUpdater = null;

    public set WidgetInstance(instance: any) {
        this.widgetInstance = instance;
    }

    constructor(
        private widgetInstance: any,
        private getConfig: () => {
            containerId: string,
            symbol: string,
        },
        private dataUrl: string
    ) {
        this.barsPulseUpdater = new FtuDataPulseUpdater(this, 10000);
    }

    public onReady(callback: (config: any) => void) {
        // TODO: Hacks! Investigate Later...
        const setCandles = (widgetInstance: any) => {
            try {
                const chart = widgetInstance.chart();
                chart.setChartType(ChartType.Candles);
            } catch (err) {
                setTimeout(() => { setCandles(widgetInstance); }, 100);
            }
        };

        setTimeout(() => {
            const { containerId, symbol } = this.getConfig();
            const tvConfig = {
                symbol,
                container_id: containerId
            }
            callback(tvConfig);
        }, 0);
        setCandles(this.widgetInstance);
    }

    public searchSymbolsByName() {
        const { symbol } = this.getConfig();

        return [
            {
                symbol,
                full_name: symbol,
                description: 'BTC Futures',
                exchange: 'DERIBIT',
                type: 'futures'
            }
        ];
    }

    public resolveSymbol(symbolName: string, onSymbolResolvedCallback: Function) {
        setTimeout(() => {
            onSymbolResolvedCallback({
                'name': symbolName,
                'symbol': symbolName,
                'description': 'BTC Futures',
                'exchange': 'DRB',
                'listed_exchange': 'DRB',
                'exchange-listed': 'DRB',
                'exchange-traded': 'DRB',
                'minmov': 1,
                'pricescale': 100,
                'minmove2': 0,
                'has_intraday': true,
                'has-dwm': true,
                'has-intraday': true,
                'intraday_multipliers': ['1', '5', '30', '60'],
                'has_weekly_and_monthly': false,
                'has_empty_bars': false,
                'type': 'bitcoin',
                'volume_precision': 0,
                'data_status': 'streaming',
                'supported_resolutions': [
                    '1', '3', '5', '15',
                    '30', '60', '120', '180',
                    '240', '360', '720', '1D'
                ],
                'session': '24x7',
                'timezone': 'UTC',
                'session-regular': '24x7'
            });
        }, 0);
    }

    public getBars(
        symbolInfo,
        resolution,
        from,
        to,
        onHistoryCallback: Function,
        onErrorCallback: Function = () => { return; }
    ) {
        const resolutionDuration = resolutionToDuration(resolution);

        if (resolutionDuration) {
            const minTimeStamp = moment().subtract(resolutionDuration);
            if (to < minTimeStamp.unix()) {
                onHistoryCallback([], { noData: true });
            }
        }

        this.send(this.dataUrl, {
            q: 'ftu_twc',
            symbol: symbolInfo.name,
            resolution,
            from,
            to
        }).then((data) => {
            if (data.s === DataResult.Error) {
                if (onErrorCallback) {
                    onErrorCallback(data.s);
                }
                return;
            }

            const bars = (data.t || []).map((timeSeconds: number, index: number) => {
                const value = {
                    time: timeSeconds * 1000,
                    close: data.c[index],
                    open: data.c[index],
                    high: data.c[index],
                    low: data.c[index]
                };

                if (!(
                    _.isUndefined(data.o) ||
                    _.isUndefined(data.h) ||
                    _.isUndefined(data.v)
                )) {
                    value.open = data.o[index];
                    value.high = data.h[index];
                    value.low = data.l[index];
                }

                return value;
            });

            onHistoryCallback(bars, {
                noData: _.isEmpty(data.t), nextTime: data.nb || data.nextTime
            });
        }).catch((arg) => {
            console.warn(['getBars(): HTTP error', arg]);

            if (onErrorCallback) {
                onErrorCallback('network error: ' + JSON.stringify(arg));
            }
        });
    }

    public subscribeBars(
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscriberUID,
        onResetCacheNeededCallback
    ) {
        this.barsPulseUpdater.subscribeDataListener(
            symbolInfo, resolution, onRealtimeCallback, subscriberUID);
    };

    public unsubscribeBars(subscriberUID) {
        this.barsPulseUpdater.unsubscribeDataListener(subscriberUID);
    };

    public calculateHistoryDepth(resolution, resolutionBack, intervalBack) {
        return;
    };

    public getMarks(symbolInfo, startDate, endDate, onDataCallback, resolution) {
        return;
    };

    private send(url: string, params: any) {
        const query = queryString.stringify(params);

        return fetch(`${url}?${query}`).then((response: Response) => response.json());
    }
}
