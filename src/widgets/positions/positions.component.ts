import {
    Component,
    OnInit
} from '@angular/core';
import _ from 'lodash';

import { WidgetDefinition } from './..';
import { WidgetBase } from './../widget.base';
import {
    WcTableStyleComponent,
    WcFullscreenComponent,
    WcDownloadCSVComponent
} from './../_widgetControls';

interface DataRow {
    instrument: string;
    size: number;
    sizeBtc: number;
    avgPrice: number;
    markPrice: number;
    estLiqPrice: number;
    pnl: number;
    sessionUpl: number;
    sessionRpl: number;
    initialMargin: number;
    maintenanceMargin: number;
    settlementPrice: number;
}

interface DataSum {
    size: number;
    sizeBtc: number;
    pnl: number;
    sessionUpl: number;
    initialMargin: number;
    maintenanceMargin: number;
}

@Component({
    styleUrls: [
        './positions.component.scss'
    ],
    templateUrl: './positions.component.html'
})
export class PositionsWidgetComponent extends WidgetBase implements OnInit {
    public static readonly definition: WidgetDefinition = {
        name: 'positions'
    };

    public readonly controlComponents: any[] = [
        WcTableStyleComponent,
        WcFullscreenComponent,
        WcDownloadCSVComponent
    ];

    public data: DataRow[] = [];
    public sum: DataSum;

    public ngOnInit(): void {
        this.data = [
            {
                instrument: 'BTC-28JUL17',
                size: 3104,
                sizeBtc: 12.3457,
                avgPrice: 2603.22,
                markPrice: 2552.2800,
                estLiqPrice: 110.66,
                pnl: 0.0222,
                sessionUpl: 0.0222,
                sessionRpl: 0.0222,
                initialMargin: 1.2162,
                maintenanceMargin: 0.3481,
                settlementPrice: 2552.54
            },
            {
                instrument: 'BTC-19SEP17',
                size: 71,
                sizeBtc: 0.3456,
                avgPrice: 2199.01,
                markPrice: 2981.1000,
                estLiqPrice: 982.12,
                pnl: 0.0009,
                sessionUpl: 8.9821,
                sessionRpl: 0.0000,
                initialMargin: 0.0234,
                maintenanceMargin: 0.0087,
                settlementPrice: 2552.54
            }
        ];
        this.sum = this.calcSum(this.data);
    }

    private calcSum = (data: DataRow[]) => ({
        size: _.sumBy(this.data, 'size'),
        sizeBtc: _.sumBy(this.data, 'sizeBtc'),
        pnl: _.sumBy(this.data, 'pnl'),
        sessionUpl: _.sumBy(this.data, 'sessionUpl'),
        initialMargin: _.sumBy(this.data, 'initialMargin'),
        maintenanceMargin: _.sumBy(this.data, 'maintenanceMargin')
    })
}
