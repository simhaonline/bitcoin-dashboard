import {
    Component,
    OnInit
} from '@angular/core';
import _ from 'lodash';

import { DataGenerator } from 'core/common';

import { WidgetDefinition } from './..';
import { WidgetBase } from './../widget.base';
import {
    WcFullscreenComponent,
    WcDownloadCSVComponent
} from './../_widgetControls';

interface DataRow {
    side: string;
    instrument: string;
    size: number;
    price: number;
    completed: number;
    status: string;
    avgPrice: number;
    dateTime: Date;
    fees: number;
    pnl: number;
}

@Component({
    styleUrls: [
        './openOrders.component.scss'
    ],
    templateUrl: './openOrders.component.html'
})
export class OpenOrdersWidgetComponent extends WidgetBase implements OnInit {
    public static readonly definition: WidgetDefinition = {
        name: 'openOrders'
    };
    public controlComponents: any[] = [
        WcFullscreenComponent,
        WcDownloadCSVComponent
    ];

    public set currentPage(newPage: number) {
        this.pageNo = newPage;

        this.page = this.generatePage(this.data, newPage, this.itemsPerPage);
    }
    public get currentPage(): number {
        return this.pageNo;
    }

    public get itemsPerPage(): number {
        return this.pageItemsCount;
    }
    public set itemsPerPage(length: number) {
        this.pageItemsCount = length;

        this.updateData();
    }

    public totalPages = 1;
    public page: DataRow[] = [];
    public data: DataRow[] = [];

    private dataGenerator = new DataGenerator({
        side: DataGenerator.pick(['buy', 'sell']),
        instrument: DataGenerator.text('BTC-17JUN17'),
        size: DataGenerator.between(300, 1000),
        price: DataGenerator.between(100, 3000),
        completed: DataGenerator.between(100, 1000),
        status: DataGenerator.pick(['cancel', 'fill']),
        avgPrice: DataGenerator.between(100, 7000),
        dateTime: DataGenerator.custom(() => new Date()),
        fees: DataGenerator.between(0.00001, 0.0005),
        pnl: DataGenerator.custom(() => 0)
    });
    private pageNo = 1;
    private pageItemsCount = 10;

    public ngOnInit(): void {
        this.updateData();
    }

    private generatePage(data: DataRow[], currentPage: number, itemsPerPage: number) {
        return _.chain(data)
                .drop(itemsPerPage * (currentPage - 1))
                .take(itemsPerPage)
                .value();
    }

    private updateData() {
        this.data = this.dataGenerator.generateMany<DataRow>(150);
        this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
        this.page = this.generatePage(this.data, this.currentPage, this.itemsPerPage);
    }
}
