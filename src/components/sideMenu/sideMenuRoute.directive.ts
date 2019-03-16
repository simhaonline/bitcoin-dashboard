import {
    Directive,
    Input
} from '@angular/core';

/**
 * Child Component which should be used to render child routes in sidebar Nested Menu
 */
@Directive({
    selector: 'sideMenuRoute'
})
export class SideMenuRouteDirective {
    @Input()
    public url: string = '/';
    @Input()
    public title: string = 'Untitled';
    @Input()
    public class?: string = null;
}
