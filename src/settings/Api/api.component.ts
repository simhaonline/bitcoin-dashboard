import { Component } from '@angular/core';
import * as uuid from 'uuid';

enum ApiTab {
    Access = 'access',
    ApiConsole = 'api-console'
}

@Component({
    selector: 'api',
    templateUrl: 'api.component.html',
    styleUrls: [
        './api.component.scss'
    ]
})
export class ApiComponent {
    public set enabledTab(tabId: string) {
        this.tab = tabId as ApiTab;
    }
    public get enabledTab() {
        return this.tab;
    }
    public accessKey = uuid.v1().split('-')[0];
    public accessSecret = uuid.v4().toUpperCase();

    private tab = ApiTab.Access;
}
