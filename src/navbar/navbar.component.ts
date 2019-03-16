import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import _ from 'lodash';

import { PageTitleService } from 'core/pageTitle.service';

@Component({
    selector: 'app-navbar',
    styleUrls: [
        './navbar.component.scss'
    ],
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    @Input()
    public isCollapsed = true;
    @Output()
    public isCollapsedChange = new EventEmitter<boolean>();

    @Input()
    private menuEnabled = false;
    @Output()
    private menuEnabledChange = new EventEmitter<boolean>();

    public pageTitle = '';

    constructor(
        pageTitleService: PageTitleService
    ) {
        pageTitleService.title.subscribe((titlePath) => {
            this.pageTitle = _.last(titlePath);
        });
    }

    public toggleMenu(event: Event) {
        event.stopImmediatePropagation();

        this.menuEnabled = !this.menuEnabled;
        this.menuEnabledChange.emit(this.menuEnabled);
    }

    public toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        this.isCollapsedChange.emit(this.isCollapsed);
    }
}
