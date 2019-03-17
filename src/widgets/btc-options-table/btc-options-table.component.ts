import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    TemplateRef
} from '@angular/core';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import _ from 'lodash';
import moment from 'moment';

import { WidgetDefinition } from './../widget.interface';
import { WidgetBase } from './../widget.base';
import {
    WcOptionsFilterComponent,
    WcFullscreenComponent
} from './../_widgetControls';
import { DataGenerator } from 'core/common';
import { DebouncerService } from 'core/debouncer.service';
import { ScreenSizeService } from 'core/screenSize.service';

interface BtcOptionsEnabledColumns {
    last: boolean;
    iv: boolean;
    vol: boolean;
    open: boolean;
    delta: boolean;
    position: boolean;
}

interface BtcUsdVal {
    btc: number;
    usd: number;
}

interface BtcOptionsRow {
    call_last?: number;
    call_bid_size?: number;
    call_bid_iv?: number;
    call_bid?: BtcUsdVal;
    call_ask?: BtcUsdVal;
    call_ask_iv?: number;
    call_ask_size?: number;
    call_vol?: number;
    call_open?: number;
    call_delta?: number;
    call_pos?: number;

    strike?: number;

    put_last?: number;
    put_bid_size?: number;
    put_bid_iv?: number;
    put_bid?: BtcUsdVal;
    put_ask?: BtcUsdVal;
    put_ask_iv?: number;
    put_ask_size?: number;
    put_vol?: number;
    put_open?: number;
    put_delta?: number;
    put_pos?: number;

    highlight: string;

    periodEnd: Date;
}

interface OptionPeriod {
    periodEnd: Date;
    btcIndex: number;
    expireStr: string;
    symbol: string;
    data: BtcOptionsRow[];
    dataLength: number;
}

const checkToColumnPropMap = {
    last: ['call_last', 'put_last'],
    iv: ['call_bid_iv', 'call_ask_iv', 'put_ask_iv', 'put_ask_iv'],
    vol: ['call_vol', 'put_vol'],
    open: ['call_open', 'put_open'],
    delta: ['call_delta', 'put_delta'],
    position: ['call_pos', 'put_pos']
};

const dateToSymbol = (date: Date) => {
    const mDate = moment(date);

    return `BTC-${mDate.format('DD')}${mDate.format('MMM').toUpperCase()}${mDate.format('YYYY')}`;
};

const getExpiriationString = (expDate: Date) => {
    const diff = moment.duration(moment(expDate).diff(moment()));
    return `${diff.days()}d ${diff.hours()}h ${diff.minutes()}m`;
};

const BidAskGenerator = DataGenerator.custom(() => {
    const btcVal = Math.random() * 0.1 + 0.01;
    return {
        btc: btcVal,
        usd: btcVal * 8600
    };
});

const PeriodGenerator = (periodEndings: Date[]) => {
    const periodRowCounts = [5, 13, 32, 53];
    let periodIndex = 0;

    return DataGenerator.custom((rowNo: number) => {
        if (periodRowCounts.length > 0 && rowNo === periodRowCounts[0]) {
            periodRowCounts.shift();
            periodIndex = periodIndex === periodEndings.length - 1 ? periodIndex : periodIndex + 1;
        }
        const periodEndingDate = periodEndings[periodIndex];

        return periodEndingDate;
    });
};

// prop contains a row field name which may be 'call_xxx' or 'put_xxx'
// row.highlight is 'call' or 'put' determining which side of the table
// to highlight
const getCellClass = (additionalClasses?: string) =>
    (params: { row: BtcOptionsRow, column: TableColumn }) =>
        (params.column.prop.toString().indexOf(params.row.highlight) >= 0 ? ' cell--highlight' : '')
            + ` ${additionalClasses}`;

@Component({
    styleUrls: [
        './btc-options-table.component.scss'
    ],
    templateUrl: './btc-options-table.component.html'
})
export class BtcOptionsTableComponent extends WidgetBase implements OnInit, OnDestroy {
    public static readonly definition: WidgetDefinition = {
        name: 'btc-options-table'
    };
    public controlComponents: any[] = [
        WcOptionsFilterComponent,
        WcFullscreenComponent
    ];

    private get FilterComponent(): WcOptionsFilterComponent {
        return this.renderedControlComponents ?
            this.renderedControlComponents.get(WcOptionsFilterComponent) : null;
    }

    // TODO: Make it valid - all closest friday, this month friday,
    // next month friday, next quarter? friday
    private allFutureDates: Date[] = [
        moment().add(1, 'w').day(-2).toDate(),
        moment().endOf('month').day(-2).toDate(),
        moment().add(1, 'M').endOf('month').day(-2).toDate(),
        moment().add(1, 'Q').endOf('month').day(-2).toDate()
    ];

    private data: BtcOptionsRow[] = [];

    // Templates
    @ViewChild('lastTmpl')
    private lastTmpl: TemplateRef<any>;
    @ViewChild('singlePointTmpl')
    private singlePointTmpl: TemplateRef<any>;
    @ViewChild('doublePointTmpl')
    private doublePointTmpl: TemplateRef<any>;
    @ViewChild('percentTmpl')
    private percentTmpl: TemplateRef<any>;
    @ViewChild('bidTmpl')
    private bidTmpl: TemplateRef<any>;
    @ViewChild('askTmpl')
    private askTmpl: TemplateRef<any>;
    @ViewChild('strikeTmpl')
    private strikeTmpl: TemplateRef<any>;
    @ViewChild('posCallsTmpl')
    private posCallsTmpl: TemplateRef<any>;
    @ViewChild('posPutsTmpl')
    private posPutsTmpl: TemplateRef<any>;
    // DataTable
    @ViewChild(DatatableComponent)
    private table: DatatableComponent;

    private allColumns: TableColumn[] = [];

    private enabledColumns: BtcOptionsEnabledColumns = {
        last: true,
        iv: true,
        vol: true,
        open: true,
        delta: true,
        position: true
    };

    private activeColumns: TableColumn[] = [];

    /* TODO: demo only */
    private dataGenerator = new DataGenerator({
        call_last: DataGenerator.between(0, 0.8),
        call_bid_size: DataGenerator.custom(() => 5),
        call_bid_iv: DataGenerator.between(95, 99),
        call_bid: BidAskGenerator,
        call_ask: BidAskGenerator,
        call_ask_iv: DataGenerator.between(110, 115),
        call_ask_size: DataGenerator.custom(() => 5),
        call_vol: DataGenerator.between(0, 11),
        call_open: DataGenerator.between(0, 13),
        call_delta: DataGenerator.between(0, 1),
        call_pos: DataGenerator.custom(() => null),

        strike: DataGenerator.custom(() => {
            const val = Math.random() * 10000 + 7000;
            return val - (val % 500);
        }),

        put_last: DataGenerator.between(0, 0.8),
        put_bid_size: DataGenerator.custom(() => 5),
        put_bid_iv: DataGenerator.between(95, 99),
        put_bid: BidAskGenerator,
        put_ask: BidAskGenerator,
        put_ask_iv: DataGenerator.between(110, 115),
        put_ask_size: DataGenerator.custom(() => 5),
        put_vol: DataGenerator.between(0, 11),
        put_open: DataGenerator.between(0, 13),
        put_delta: DataGenerator.between(0, 1),
        put_pos: DataGenerator.custom(() => null),

        highlight: DataGenerator.custom((offset: number) => (
            (
                offset <= 1 ||
                (offset >= 5 && offset <= 7) ||
                (offset >= 13 && offset <= 18) ||
                (offset >= 32 && offset <= 37)
            ) ? 'call' : 'put'
        )),

        periodEnd: PeriodGenerator(this.allFutureDates)
    });

    private interval: any;

    constructor(
        debouncerService: DebouncerService,
        screenSizeService: ScreenSizeService
    ) {
        super();

        // TODO: Doesn't work!
        // Follow: https://github.com/swimlane/ngx-datatable/issues/193
        // and create a directive for this when it will be available
        const debouncedTableResize = debouncerService.create(() => {
            this.table.recalculate();
        });
        screenSizeService.onResize(debouncedTableResize.bind(this));
    }

    public ngOnInit(): void {
        this.allColumns = [
            {
                name: 'Last',
                prop: 'call_last',
                cellTemplate: this.lastTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Size',
                prop: 'call_bid_size',
                cellTemplate: this.singlePointTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'IV',
                prop: 'call_bid_iv',
                cellTemplate: this.percentTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Bid',
                prop: 'call_bid',
                cellTemplate: this.bidTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Ask',
                prop: 'call_ask',
                cellTemplate: this.askTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'IV',
                prop: 'call_ask_iv',
                cellTemplate: this.percentTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Size',
                prop: 'call_ask_size',
                cellTemplate: this.singlePointTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Vol',
                prop: 'call_vol',
                cellTemplate: this.singlePointTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Open',
                prop: 'call_open',
                cellTemplate: this.singlePointTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Delta',
                prop: 'call_delta',
                cellTemplate: this.doublePointTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Pos',
                prop: 'call_pos',
                sortable: false,
                cellClass: getCellClass('col-pos col-pos--calls'),
                headerClass: 'col-pos col-pos--calls',
                cellTemplate: this.posCallsTmpl
            },

            {
                name: 'Strike',
                prop: 'strike',
                sortable: false,
                cellTemplate: this.strikeTmpl,
                headerClass: 'col-strike',
                cellClass: getCellClass('col-strike'),
            },

            {
                name: 'Pos',
                prop: 'put_pos',
                sortable: false,
                cellClass: getCellClass('col-pos col-pos--puts'),
                headerClass: 'col-pos col-pos--puts',
                cellTemplate: this.posPutsTmpl
            },
            {
                name: 'Last',
                prop: 'put_last',
                cellTemplate: this.lastTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Size',
                prop: 'put_bid_size',
                cellTemplate: this.singlePointTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'IV',
                prop: 'put_bid_iv',
                cellTemplate: this.percentTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Bid',
                prop: 'put_bid',
                cellTemplate: this.bidTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Ask',
                prop: 'put_ask',
                cellTemplate: this.askTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'IV',
                prop: 'put_ask_iv',
                cellTemplate: this.percentTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Size',
                prop: 'put_ask_size',
                cellTemplate: this.singlePointTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Vol',
                prop: 'put_vol',
                cellTemplate: this.singlePointTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Open',
                prop: 'put_open',
                cellTemplate: this.singlePointTmpl,
                sortable: false,
                cellClass: getCellClass()
            },
            {
                name: 'Delta',
                prop: 'put_delta',
                cellTemplate: this.doublePointTmpl,
                sortable: false,
                cellClass: getCellClass()
            }
        ];
        this.assignActiveColumns();
        this.generateData();

        this.interval = setInterval(() => {
            const newData = _.clone(this.data);
            const rowToModify = Math.round(Math.random() * newData.length - 1);
            newData[rowToModify] = {
                ...this.dataGenerator.generate(),
                ...(_.pick(newData[rowToModify], ['periodEnd', 'highlight', 'strike']))
            };
            this.data = newData;
        }, 200);

        // Update Filter Entries
        setTimeout(() => {
            this.FilterComponent.dateFilters = [
                ...this.FilterComponent.dateFilters,
                ..._.map(this.allFutureDates, (date: Date) => ({
                    label: moment(date).format('DD MMM YY'),
                    date
                }))
            ];
        }, 0);
    }

    public ngOnDestroy(): void {
        clearInterval(this.interval);
    }

    public generatePeriodData(periodDate: Date) {
        return {
            periodEnd: periodDate,
            btcIndex: 8756.78,
            expireStr: getExpiriationString(periodDate),
            symbol: dateToSymbol(periodDate),
        };
    }

    public getRowClass(row: BtcOptionsRow) {
        return `highlight--${row.highlight}`;
    }

    private assignActiveColumns() {
        let disabledColumnProps = [];

        _.forOwn(this.enabledColumns, (active: boolean, key: string) => {
            if (!active && checkToColumnPropMap[key]) {
                disabledColumnProps = [...disabledColumnProps, ...checkToColumnPropMap[key]];
            }
        });

        this.activeColumns = _.filter(this.allColumns, (col: TableColumn) =>
            !_.includes(disabledColumnProps, col.prop));
    }

    private generateData() {
        this.data = this.dataGenerator.generateMany<BtcOptionsRow>(54);
    }
}
