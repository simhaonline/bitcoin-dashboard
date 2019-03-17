import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import * as _ from 'lodash';

import { DataGenerator } from 'core/common';

export enum TransactionType {
    Deposit = 'deposit',
    Withdrawal = 'withdrawal'
}

export interface Transaction {
    date: Date;
    instrument?: string;
    type: TransactionType;
    side?: string;
    quantity?: number;
    price?: number;
    cashFlow: number;
    feeRate?: string;
    payedFee: number;
    change: number;
    balance: number;
    transactionId: string;
    orderId: string;
    depositAddress?: string;
};

@Component({
    selector: 'transaction-log',
    styleUrls: [
        './transaction-log.component.scss'
    ],
    templateUrl: 'transaction-log.component.html'
})
export class TransactionLogComponent implements OnInit {
    @ViewChild('dateTmpl')
    private dateTmpl: TemplateRef<any>;
    @ViewChild('nullTmpl')
    private nullTmpl: TemplateRef<any>;
    @ViewChild('typeTmpl')
    private typeTmpl: TemplateRef<any>;
    @ViewChild('cashFlowTmpl')
    private cashFlowTmpl: TemplateRef<any>;
    @ViewChild('balanceTmpl')
    private balanceTmpl: TemplateRef<any>;
    @ViewChild('infoTmpl')
    private infoTmpl: TemplateRef<any>;

    public columns: TableColumn[];
    public transactionsList: Transaction[] = [];
    public transactionsListPageNo = 1;
    public transactionsListPageSize = 20;

    /* TODO: demo only */
    private dataGenerator = new DataGenerator({
        date: DataGenerator.custom(() => new Date()),
        instrument: DataGenerator.custom(() => 'BTC'),
        type: DataGenerator.custom(() => {
            return [TransactionType.Deposit, TransactionType.Withdrawal]
                [Math.round(Math.random())];
        }),
        side: DataGenerator.custom(() => null),
        quantity: DataGenerator.custom(() => null),
        price: DataGenerator.custom(() => null),
        cashFlow: DataGenerator.between(-2, 2),
        feeRate: DataGenerator.custom(() => null),
        fee: DataGenerator.custom(() => {
            return [0, 0.0006]
                [Math.round(Math.random())];
        }),
        change: DataGenerator.between(-2, 2),
        balance: DataGenerator.between(0, 20),
        transactionId: DataGenerator.custom(() => null),
        orderId: DataGenerator.custom(() => null)
    });

    constructor() {
        const data = this.dataGenerator.generateMany(248);
        this.transactionsList = _.map(data, (entry: Transaction) => ({
            ...entry,
            depositAddress: entry.type === TransactionType.Deposit
                && 'mrQy9bWKZG7CWa4Gq6pTFmSskQUHGzLEiz'
        }));
    }

    public ngOnInit(): void {
        this.columns = [
            {
                name: 'Date (UTC)',
                prop: 'date',
                cellTemplate: this.dateTmpl,
                width: 130
            },
            {
                name: 'Instrument',
                prop: 'instrument',
                width: 65
            },
            {
                name: 'Type',
                prop: 'type',
                cellTemplate: this.typeTmpl,
                width: 90,
                sortable: false
            },
            {
                name: 'Side',
                prop: 'side',
                cellTemplate: this.nullTmpl,
                width: 40,
                sortable: false
            },
            {
                name: 'Quantity',
                prop: 'quantity',
                cellTemplate: this.nullTmpl,
                width: 60
            },
            {
                name: 'Price',
                prop: 'price',
                cellTemplate: this.nullTmpl,
                width: 40
            },
            {
                name: 'Cash Flow',
                prop: 'cashFlow',
                cellTemplate: this.cashFlowTmpl,
                width: 100
            },
            {
                name: 'Fee Rate',
                prop: 'feeRate',
                cellTemplate: this.nullTmpl,
                width: 60,
                sortable: false
            },
            {
                name: 'Payed fee',
                prop: 'payedFee',
                cellTemplate: this.nullTmpl,
                width: 60
            },
            {
                name: 'Change',
                prop: 'change',
                cellTemplate: this.cashFlowTmpl,
                width: 100
            },
            {
                name: 'Balance',
                prop: 'balance',
                cellTemplate: this.balanceTmpl,
                width: 100
            },
            {
                name: 'Transaction ID',
                prop: 'transactionId',
                cellTemplate: this.nullTmpl,
                width: 90,
            },
            {
                name: 'Order ID',
                prop: 'orderId',
                cellTemplate: this.nullTmpl,
                width: 60
            },
            {
                name: 'Info',
                cellTemplate: this.infoTmpl,
                prop: 'depositAddress',
                width: 250,
                sortable: false
            },
        ];
    }
}
