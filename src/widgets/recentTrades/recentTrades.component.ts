import {
    Component
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FetchLastTrades } from 'store/actions/recent-trades.actions';
import { AppState } from 'store/app.state';
import { RecentTradesModel } from 'store/models/recent-trades.model';

import { WidgetDefinition } from './..';

@Component({
    styleUrls: [
        './recentTrades.component.scss'
    ],
    templateUrl: './recentTrades.component.html'
})
export class RecentTradesWidgetComponent {
    public static readonly definition: WidgetDefinition = {
        name: 'recentTrades'
    };

    public recentTrades: Observable<RecentTradesModel>;

    public constructor(
        store: Store<AppState>
    ) {
        this.recentTrades = store.select('recentTrades');

        store.dispatch(new FetchLastTrades());
    }
}
