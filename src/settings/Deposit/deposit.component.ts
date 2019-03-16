import { Component } from '@angular/core';
import uuid from 'uuid';
import _ from 'lodash';

import { DataGenerator } from 'core/common';

export enum DepositStatus {
    Unconfirmed = 'unconfirmed',
    Cancelled = 'cancelled',
    Success = 'success'
}

export interface DepositEntry {
    date: Date;
    amount: number;
    fee: number;
    addressName: string;
    address: string;
    status: DepositStatus;
}

@Component({
    templateUrl: 'deposit.component.html',
    styleUrls: [
        './deposit.component.scss'
    ],
})
export class DepositComponent {
    public depositAddress = uuid.v4();
    public depositsList: DepositEntry[] = [];
    public depositsListPage: DepositEntry[] = [];
    public depositsListPageSize = 20;

    public set depositsListPageNo(val: number) {
        this.pageNo = val;
        this.depositsListPage = _.chain(this.depositsList)
            .drop(this.depositsListPageSize * (this.depositsListPageNo - 1))
            .take(this.depositsListPageSize)
            .value();
    }
    public get depositsListPageNo(): number {
        return this.pageNo;
    }
    public get depositsListTotalPages(): number {
        return Math.ceil(this.depositsList.length / this.depositsListPageSize);
    }

    private pageNo = 1;

    /* TODO: demo only */
    private dataGenerator = new DataGenerator({
        date: DataGenerator.custom(() => new Date()),
        amount: DataGenerator.between(0.00001, 0.01),
        fee: DataGenerator.custom(() => 0.0006),
        addressName: DataGenerator.custom(() => 'Deposit Address Name'),
        address: DataGenerator.custom(() => uuid.v4()),
        status: DataGenerator.custom(() => {
            return [DepositStatus.Success, DepositStatus.Cancelled, DepositStatus.Unconfirmed]
                [Math.round(Math.random() * 2)];
        })
    });

    constructor() {
        this.depositsList = this.dataGenerator.generateMany(248);

        this.depositsListPageNo = 1;
    }
}
