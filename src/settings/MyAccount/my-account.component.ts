import { Component } from '@angular/core';
import _ from 'lodash';

import { AuthenticationService } from 'core/authentication.service';
import { DataGenerator } from 'core/common';

export interface AccessEntry {
    date: Date;
    ip: string;
    success: boolean;
}

const ACCESS_LIST_PAGE_LENGTH = 20;

@Component({
    templateUrl: 'my-account.component.html'
})
export class MyAccountComponent {
    public userName = '';
    public userEmail = '';

    public accessList: AccessEntry[] = [];
    public accessListPage: AccessEntry[] = [];
    public accessListPageSize = ACCESS_LIST_PAGE_LENGTH;
    public set accessListPageNo(val: number) {
        this.pageNo = val;
        this.accessListPage = _.chain(this.accessList)
            .drop(ACCESS_LIST_PAGE_LENGTH * (this.accessListPageNo - 1))
            .take(ACCESS_LIST_PAGE_LENGTH)
            .value();
    }
    public get accessListPageNo(): number {
        return this.pageNo;
    }
    public get accessListTotalPages(): number {
        return Math.ceil(this.accessList.length / ACCESS_LIST_PAGE_LENGTH);
    }
    private pageNo = 1;

    /* TODO: demo only */
    private dataGenerator = new DataGenerator({
        date: DataGenerator.custom(() => new Date()),
        ip: DataGenerator.custom(() => '127.0.0.1'),
        success: DataGenerator.boolean()
    });

    constructor(authService: AuthenticationService) {
        this.userName = authService.loggedUser.userName;
        this.userEmail = authService.loggedUser.email;

        this.accessList = this.dataGenerator.generateMany(248);

        this.accessListPageNo = 1;
    }
}
