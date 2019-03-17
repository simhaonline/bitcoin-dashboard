import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-api-console',
    templateUrl: 'api-console.component.html'
})
export class ApiConsoleComponent {
    @Input()
    public accessKey: string;
    @Input()
    public accessSecret: string;

    public actions: string[] = [
        '/public/test',
        '/public/getinstruments',
        '/public/getcurrencies',
        '/public/getorderbook',
        '/public/getlasttrades',
        '/public/getlastsettlements',
        '/public/getsummary',
        '/public/getannouncements',
        '/public/index',
        '/public/stats',
        '/public/setheartbeat',
        '/public/disableheartbeat',
        '/private/account',
        '/private/buy',
        '/private/sell',
        '/private/cancel',
        '/private/orderstate',
        '/private/cancelall',
        '/private/edit',
        '/private/getopenorders',
        '/private/positions',
        '/private/orderhistory',
        '/private/tradehistory',
        '/private/settlementhistory',
        '/private/datatable',
        '/private/newannouncements',
        '/private/setannouncementasread',
        '/private/cancelondisconnect',
        '/private/getemaillang',
        '/private/setemaillang',
        '/private/logout',
        '/private/subscribe',
        '/private/unsubscribe'
    ];
    public action = _.first(this.actions);
}
