import moment from 'moment';
import _ from 'lodash';

import resolutionToDuration from './resolutionToDuration';
import FtuDataFeed from './FtuDataFeed';

import { Subscription, DataResult } from './tradingView.types';


export default class FtuDataPulseUpdater {
    private requestPending = 0;
    private subscribers: {[guid: string]: Subscription} = {};

    constructor(
        private dataFeed: FtuDataFeed,
        updateFrequency?: number
    ) {
        if (updateFrequency && updateFrequency > 0) {
            setInterval(this.update.bind(this), updateFrequency);
        }
    }

    public update() {
        if (this.requestPending > 0) {
            return;
        }

        for (const listenerGUID of _.keys(this.subscribers)) {
            const subscriptionRecord = this.subscribers[listenerGUID];

            const datesRangeRight = moment().unix();
            // TODO: Sounds hacky - check it out later
            // BEWARE: please note we really need 2 bars, not the only last one
            // see the explanation below. `10` is the `large enough` value to work around holidays
            const datesRangeLeft = datesRangeRight
                - 30 * this.periodLengthSeconds(subscriptionRecord.resolution, 10);

            this.requestPending++;

            this.dataFeed.getBars(
                subscriptionRecord.symbolInfo,
                subscriptionRecord.resolution,
                datesRangeLeft,
                datesRangeRight,
                (receivedBars) => {
                    this.requestPending--;

                    //  means the subscription was cancelled while waiting for data
                    if (!this.subscribers.hasOwnProperty(listenerGUID)) {
                        return;
                    }

                    const lastBar = receivedBars[receivedBars.length - 1];

                    if (lastBar.s === DataResult.NoData) {
                        return;
                    }

                    // BEWARE: this one isn't working when first update
                    // comes and this update makes a new bar. In this case
                    // subscriptionRecord.lastBarTime = NaN
                    const isNewBar = !isNaN(subscriptionRecord.lastBarTime)
                        && lastBar.time > subscriptionRecord.lastBarTime;

                    // Pulse updating may miss some trades data
                    // (ie, if pulse period = 10 secods and new
                    // bar is started 5 seconds later after the last update, the
                    // old bar's last 5 seconds trades will be lost).
                    // Thus, at fist we should broadcast old bar updates when it's ready.
                    if (isNewBar) {
                        if (receivedBars.length < 2) {
                            throw new Error('Not enough bars in history for' +
                                ' proper pulse update. Need at least 2.');
                        }

                        const previousBar = receivedBars[receivedBars.length - 2];
                        subscriptionRecord.listeners.forEach(
                            (listener) => { listener(previousBar); });
                    }

                    subscriptionRecord.lastBarTime = lastBar.time;

                    subscriptionRecord.listeners.forEach((listener) => { listener(lastBar); });
                },
                () => {
                    this.requestPending--;
                }
            );
        }
    }

    public subscribeDataListener(
        symbolInfo: string,
        resolution: string,
        newDataCallback: Function,
        listenerGUID: string
    ) {
        if (!this.subscribers.hasOwnProperty(listenerGUID)) {
            this.subscribers[listenerGUID] = {
                symbolInfo,
                resolution,
                lastBarTime: NaN,
                listeners: []
            };
        }

        this.subscribers[listenerGUID].listeners.push(newDataCallback);
    }

    public unsubscribeDataListener(listenerGUID: string) {
        delete this.subscribers[listenerGUID];
    }

    private periodLengthSeconds(resolution: string, requiredPeriodsCount: number) {
        const periodDuration = resolutionToDuration(resolution);

        return (periodDuration ? periodDuration.asSeconds() : 3600) * requiredPeriodsCount;
    }
}
