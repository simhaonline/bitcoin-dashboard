import {
    Component,
    Input,
    ContentChild,
    ContentChildren,
    QueryList,
} from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { SideMenuRouteDirective } from './sideMenuRoute.directive';
import { SideMenuTitleDirective } from './sideMenuTitle.directive';

/**
 * Main Component for the Nested Sidebar Menu
 */
@Component({
    selector: 'app-side-menu',
    styleUrls: [
        './sideMenu.component.scss'
    ],
    templateUrl: './sideMenu.component.html',
    animations: [
        trigger('isOpenState', [
            state('open', style({
                height: '*'
            })),
            state('closed', style({
                height: '0px'
            })),
            transition('open => closed, closed => open',
                animate('300ms cubic-bezier(0.215, 0.610, 0.355, 1.000)'))
        ])
    ]
})
export class SideMenuComponent {
    @Input()
    set isOpen(val: boolean) {
        this.openState = val ? 'open' : 'closed';
    }
    get isOpen(): boolean {
        return this.openState === 'open';
    }

    @ContentChild(SideMenuTitleDirective)
    public titleElement: SideMenuTitleDirective;
    @ContentChildren(SideMenuRouteDirective)
    public routeElements: QueryList<SideMenuRouteDirective>;

    public openState = 'closed';
    public hasActiveRoute = false;

    constructor(router: Router) {
        const isRouteActive = () =>
            !!this.routeElements.find((routeElement: SideMenuRouteDirective) =>
                router.isActive(routeElement.url, false));

        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.hasActiveRoute = this.isOpen = isRouteActive();
            }
        });
    }
}
