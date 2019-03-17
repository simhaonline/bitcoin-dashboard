import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import uuid from 'uuid';
import _ from 'lodash';

import { DataGenerator } from 'core/common';

export enum WithdrawStatus {
    Unconfirmed = 'unconfirmed',
    Cancelled = 'cancelled',
    Success = 'success'
}

export interface WithdrawalEntry {
    date: Date;
    amount: number;
    fee: number;
    addressName: string;
    address: string;
    status: WithdrawStatus;
}

@Component({
    templateUrl: 'withdraw.component.html',
    styleUrls: [
        './withdraw.component.scss'
    ],
})
export class WithdrawComponent {
    public withdrawalList: WithdrawalEntry[] = [];
    public withdrawalListPage: WithdrawalEntry[] = [];
    public withdrawalListPageSize = 20;
    public set withdrawalListPageNo(val: number) {
        this.pageNo = val;
        this.withdrawalListPage = _.chain(this.withdrawalList)
            .drop(this.withdrawalListPageSize * (this.withdrawalListPageNo - 1))
            .take(this.withdrawalListPageSize)
            .value();
    }
    public get withdrawalListPageNo(): number {
        return this.pageNo;
    }
    public get withdrawalListTotalPages(): number {
        return Math.ceil(this.withdrawalList.length / this.withdrawalListPageSize);
    }
    private pageNo = 1;

    /* TODO: demo only */
    private dataGenerator = new DataGenerator({
        date: DataGenerator.custom(() => new Date()),
        amount: DataGenerator.between(0.00001, 0.01),
        fee: DataGenerator.custom(() => 0.0006),
        addressName: DataGenerator.custom(() => 'Some Address Name'),
        address: DataGenerator.custom(() => uuid.v4()),
        status: DataGenerator.custom(() => {
            return [WithdrawStatus.Success, WithdrawStatus.Cancelled, WithdrawStatus.Unconfirmed]
                [Math.round(Math.random() * 2)];
        })
    });

    constructor(
        private tostr: ToastrService
    ) {
        this.withdrawalList = this.dataGenerator.generateMany(248);

        this.withdrawalListPageNo = 1;
    }

    public withdraw() {
        const rnd = Math.round(Math.random() * 3);

        switch (rnd) {
            default:
            case 0:
                this.tostr.error('Failed to withdraw', 'Withdraw Error');
                break;
            case 1:
                this.tostr.success('Withdrawal complete sucessfully!', 'Withdraw Complete');
                break;
            case 2:
                this.tostr.info('Withdrawing now is impossible, try again later', 'Withdraw Info');
                break;
            case 3:
                this.tostr.warning('Withdrawal complete with errors', 'Withdraw Warning');
                break;
        }
    }
}
