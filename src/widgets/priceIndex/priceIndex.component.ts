import {
    Component,
    OnInit
} from '@angular/core';
import _ from 'lodash';

import { WidgetDefinition } from './..';
import {
    WcChartZoomComponent
} from './../_widgetControls';
import { DataGenerator } from 'core/common';

interface Exchange {
    exchangeName: string;
    avgBidAsk?: number;
    lastUpdate?: Date;
    weight: number;
}

interface DeliveryPrice {
    date: Date;
    price: number;
}

@Component({
    styleUrls: [
        './priceIndex.component.scss'
    ],
    templateUrl: './priceIndex.component.html'
})
export class PriceIndexWidgetComponent implements OnInit {
    public static readonly definition: WidgetDefinition = {
        name: 'priceIndex'
    };
    public readonly controlComponents: any[] = [
        WcChartZoomComponent
    ];

    public set pageNo(pageNo: number) {
        this.page = pageNo >= 1 && pageNo <= this.totalPages ?
            pageNo : this.pageNo;

        const offset = (this.pageNo - 1) * this.pageSize;

        this.deliveryPricesPage = _.take(_.drop(this.deliveryPrices, offset), this.pageSize);
    }
    public get pageNo(): number {
        return this.page;
    }
    public exchanges: Exchange[] = [];
    public deliveryPrices: DeliveryPrice[] = [];
    public deliveryPricesPage: DeliveryPrice[] = [];
    public totalPages = 0;
    public pageSize = 7;

    private page = 1;

    private deliveryPriceGenerator = new DataGenerator({
        price: DataGenerator.between(8000, 9000),
        date: DataGenerator.custom(() => new Date())
    });

    public ngOnInit(): void {
        this.exchanges = [
            {
                exchangeName: 'Bitfinex',
                avgBidAsk: null,
                lastUpdate: null,
                weight: 0
            },
            {
                exchangeName: 'Bitstamp',
                avgBidAsk: 8085.89,
                lastUpdate: new Date(),
                weight: 33.33
            },
            {
                exchangeName: 'GDAX',
                avgBidAsk: 8080.99,
                lastUpdate: new Date(),
                weight: 0
            },
            {
                exchangeName: 'Gemini',
                avgBidAsk: 8090.79,
                lastUpdate: new Date(),
                weight: 0
            },
            {
                exchangeName: 'Itbit',
                avgBidAsk: 8087.68,
                lastUpdate: new Date(),
                weight: 33.33
            },
            {
                exchangeName: 'Kraken',
                avgBidAsk: 8084.00,
                lastUpdate: new Date(),
                weight: 33.33
            }
        ];

        this.deliveryPrices = this.deliveryPriceGenerator.generateMany(400);
        this.totalPages = Math.ceil(this.deliveryPrices.length / this.pageSize);

        this.pageNo = 1;
    }
}
