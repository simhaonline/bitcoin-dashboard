import {
    Directive,
    TemplateRef
} from '@angular/core';

/**
 * Use this directive to provide trigger content for the menu
 */
@Directive({
    selector: 'ng-template[sideMenuTitle]'
})
export class SideMenuTitleDirective {
    constructor(public templateRef: TemplateRef<any>) { }
}
