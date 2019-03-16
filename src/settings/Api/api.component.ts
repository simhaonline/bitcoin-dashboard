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
    private enabledTab = ApiTab.Access;
    private accessKey = uuid.v1().split('-')[0];
    private accessSecret = uuid.v4().toUpperCase();
}
