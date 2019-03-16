/**
 * Angular 2 decorators and services
 */
import {
    Component,
    OnInit,
    ViewEncapsulation,
    Renderer2,
    AfterViewChecked
} from '@angular/core';
import { Store } from '@ngrx/store';
import moment from 'moment';

import { AppState } from 'store/app.state';
import { FetchCurrentInstruments } from 'store/actions/instruments.actions';

/**
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.component.scss'
    ],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewChecked {
    public isNavbarCollapsed = true;
    public sidebarVisible = false;
    public year = moment().format('YYYY');

    constructor(
        private renderer: Renderer2,
        private store: Store<AppState>
    ) {
    }

    public ngOnInit() {
        // App Start actions dispatches
        this.store.dispatch(new FetchCurrentInstruments());
    }

    public ngAfterViewChecked(): void {
        this.renderer.removeClass(document.body, 'loading');
    }
}
