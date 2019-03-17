import {
    Component,
    OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { FetchAccount } from 'store/actions/account-status.actions';

import { AppState } from 'store/app.state';

export interface SummaryData {
    btcIndex?: number;
    btcDelta?: number;
    equity?: number;
    balance?: number;
    available?: number;
    connected?: boolean;
    time?: number;
}

@Component({
    selector: 'app-summary',
    styleUrls: [
        './summary.component.scss'
    ],
    templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnDestroy {
    public data: SummaryData = { };

    private btcIndexSub: Subscription;
    private accountStatusSub: Subscription;
    private remoteStatusSub: Subscription;

    constructor(
        private store: Store<AppState>
    ) {
        const btcIndex = this.store.select('btcIndex');
        const accountStatus = this.store.select('accountStatus');
        const remoteStatus = this.store.select('remoteStatus');

        // Merge store branches into one local data structure
        this.btcIndexSub = btcIndex.subscribe((currencyIndex) => {
            console.log(currencyIndex.valueDiff);
            Object.assign(this.data, {
                btcIndex: currencyIndex.value,
                btcDelta: currencyIndex.valueDiff
            });
        });

        this.accountStatusSub = accountStatus.subscribe((account) => {
            Object.assign(this.data, {
                equity: account.equity,
                balance: account.balance,
                available: account.availableFunds
            });
        });

        this.remoteStatusSub = remoteStatus.subscribe((remote) => {
            Object.assign(this.data, {
                connected: remote.connected,
                time: remote.serverTime
            });
        });

        // Fetch account data
        this.store.dispatch(new FetchAccount());
    }

    public ngOnDestroy(): void {
        this.btcIndexSub.unsubscribe();
        this.accountStatusSub.unsubscribe();
        this.remoteStatusSub.unsubscribe();
    }
}
