import {
    Component,
    OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { WidgetDefinition } from './..';

import { AppState } from 'store/app.state';
import { FetchAccount } from 'store/actions/account-status.actions';
import { AccountStatusModel } from 'store/models/account-status.model';

@Component({
    styleUrls: [
        './accountSummary.component.scss'
    ],
    templateUrl: './accountSummary.component.html'
})
export class AccountSummaryWidgetComponent implements OnDestroy {
    public static readonly definition: WidgetDefinition = {
        name: 'accountSummary'
    };

    public accountData: AccountStatusModel;
    private sub?: Subscription;

    constructor(
        private store: Store<AppState>
    ) {
        this.sub = store.select('accountStatus').subscribe((account) => {
            this.accountData = account;
        });

        this.store.dispatch(new FetchAccount());
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
