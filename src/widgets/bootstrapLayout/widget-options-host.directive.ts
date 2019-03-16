import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appWidgetOptionsHost]',
})
export class WidgetOptionsHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
