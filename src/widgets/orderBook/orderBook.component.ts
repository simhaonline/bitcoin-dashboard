import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    forwardRef
} from '@angular/core';
import { Subscription, Observable, interval } from 'rxjs';
import { switchMap, combineLatest, startWith } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from 'store/app.state';
import _ from 'lodash';
import moment from 'moment';

import { WidgetBase } from 'widgets/widget.base';
import { WidgetDefinition } from 'widgets/widget.interface';

import {
    WcFullscreenComponent,
    WcTableStyleComponent,
} from './../_widgetControls';
import { TableStyle } from './../_widgetControls/tableStyle';

import { Instrument, OrderBook, BidAsk } from 'api-services/service-api.actions';
import { FetchOrderBook } from 'store/actions/orderbook.actions';

export interface OrderBookInitConfig {
    orderBookIndex?: number;
    orderBookKind: 'future' | 'option';
}

const DEFAULT_CONFIG: OrderBookInitConfig = {
    orderBookKind: 'future',
    orderBookIndex: 0
};
const TOTAL_ENTRIES = 8;

const roundTo = (val: number, target: number) => {
    return val - (val % target) + target;
};

interface Summary {
    low?: number;
    high?: number;
    volume?: number;
    open?: number;
    expiresIn?: string;
    premium?: number;
    overall?: number;
    mark?: number;
    index?: number;
}

@Component({
    styleUrls: [
        './orderBook.component.scss'
    ],
    templateUrl: './orderBook.component.html'
})
export class OrderBookWidgetComponent extends WidgetBase implements OnDestroy {
    public static readonly definition: WidgetDefinition = {
        name: 'orderBook'
    };

    public readonly controlComponents: any[] = [
        WcTableStyleComponent,
        WcFullscreenComponent
    ];

    public set data(val: OrderBookInitConfig) {
        this.dataEntries = {
            ...this.dataEntries,
            ...val
        };
    }
    public get data(): OrderBookInitConfig {
        return this.dataEntries;
    }

    public set grouping(val: number) {
        this.groupingVal = val;

        this.updateAsksBids(this.orderBook);
    }
    public get grouping(): number {
        return this.groupingVal;
    }

    public summary: Summary = { };
    public bids: BidAsk[] = [];
    public asks: BidAsk[] = [];

    public readonly ViewMode: any = TableStyle;

    private targetInstrument: Instrument;
    private orderBook: OrderBook;

    private dataEntries: OrderBookInitConfig = DEFAULT_CONFIG;
    private groupingVal?: number = null;

    private instrumentsSub: Subscription;
    private orderBookSub: Subscription;
    private btcIndexSub: Subscription;
    private expiriationSub: Subscription;

    private get tableStyleComponent(): WcTableStyleComponent {
        return this.renderedControlComponents ?
            this.renderedControlComponents.get(WcTableStyleComponent) : null;
    }

    private get fullscreenComponent(): WcFullscreenComponent {
        return this.renderedControlComponents ?
            this.renderedControlComponents.get(WcFullscreenComponent) : null;
    }

    private get selectedTableStyle(): TableStyle {
        return this.tableStyleComponent ?
            this.tableStyleComponent.style : TableStyle.Table;
    }

    private get isFullscreen(): boolean {
        return this.fullscreenComponent ?
            this.fullscreenComponent.enabled : false;
    }

    constructor(
        private store: Store<AppState>
    ) {
        super();

        const instruments = store.select('instruments');
        const orderBook = store.select('orderBook');
        const btcIndex = store.select('btcIndex');

        this.orderBookSub = orderBook.subscribe((orderBookModel) => {
            if (this.targetInstrument) {
                this.orderBook = orderBookModel.orderbooks[this.targetInstrument.instrumentName];

                this.summary.low = this.orderBook.low;
                this.summary.high = this.orderBook.high;
                this.summary.mark = this.orderBook.mark;

                this.updateAsksBids(this.orderBook);
            }
        });

        this.btcIndexSub = btcIndex.subscribe((index) => {
            if (index) {
                this.summary.index = index.value;
            }
        });

        this.instrumentsSub = instruments.subscribe((instrumentsModel) => {
            this.targetInstrument =
                _.chain(instrumentsModel.currentInstruments)
                    .filter({ kind: this.data.orderBookKind })
                    .orderBy(['expiration'], ['asc'])
                    .nth(this.data.orderBookIndex)
                    .value();

            if (this.targetInstrument) {
                this.updateExpirationTime();

                this.store.dispatch(new FetchOrderBook({
                    instrument: this.targetInstrument.instrumentName
                }));
            }
        });

        this.expiriationSub =
            interval(3600).pipe(
                startWith(0)
            ).subscribe(() => {
                this.updateExpirationTime();
            });
    }

    public ngOnDestroy() {
        this.orderBookSub.unsubscribe();
        this.instrumentsSub.unsubscribe();
        this.btcIndexSub.unsubscribe();
        this.expiriationSub.unsubscribe();
    }

    private updateExpirationTime() {
        if (this.targetInstrument) {
            const mExpirationDate = moment(this.targetInstrument.expiration);
            this.summary.expiresIn =
                moment.duration(moment(mExpirationDate).diff(moment())).humanize();
        }
    }

    private updateAsksBids(orderBook: OrderBook) {
        const transform = (
            items: BidAsk[],
            maxLength: number,
            prependPadding: boolean = false
        ): BidAsk[] => {
            return _.chain(items)
                .orderBy(['price'], ['desc'])
                // Grouping
                .thru((arr) => {
                    if (this.grouping) {
                        const output: BidAsk[] = [];
                        for (const val of arr) {
                            const roundedPrice = roundTo(val.price, this.grouping);
                            const existing = _.find(output, { price: roundedPrice });
                            if (existing) {
                                existing.quantity = existing.quantity + val.quantity;
                                existing.cm = val.cm > existing.cm ? val.cm : existing.cm;
                            } else {
                                output.push({
                                    price: roundedPrice,
                                    quantity: val.quantity,
                                    cm: val.cm
                                });
                            }
                        }
                        return output;
                    } else {
                        return arr;
                    }
                })
                // Length adjustement
                .thru((arr) => {
                    const lengthDiff = maxLength - arr.length;

                    if (lengthDiff > 0) {
                        // Extend with empty elements
                        return prependPadding ?
                            [...(_.fill(Array(lengthDiff), {} as BidAsk)), ...arr] :
                            [...arr, ...(_.fill(Array(lengthDiff), {} as BidAsk))];
                    }
                    if (lengthDiff < 0) {
                        // Take last elements needed
                        return _.takeRight(arr, maxLength);
                    }

                    return arr;
                })
                .value();
        };

        const largestArrLength = _.max([
            orderBook.bids.length,
            orderBook.asks.length
        ]);
        const length = TOTAL_ENTRIES;

        this.bids = transform(orderBook.bids, length);
        this.asks = transform(orderBook.asks, length, this.selectedTableStyle === TableStyle.Table);
    }
}
