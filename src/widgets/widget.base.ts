import {
    ViewChild,
    forwardRef
} from '@angular/core';
import {
    WidgetOptionsHostDirective
} from './';

export class WidgetBase {
    // tslint:disable-next-line:no-forward-ref
    @ViewChild(forwardRef(() => WidgetOptionsHostDirective))
    public widgetOptionsHost: WidgetOptionsHostDirective;

    protected renderedControlComponents: WeakMap<any, any> = null;

    public controlComponentsInstances(instances: WeakMap<any, any>) {
        this.renderedControlComponents = instances;

        this.OnControlComponentsInited();
    }
    // tslint:disable-next-line:no-empty
    public OnControlComponentsInited() { }
}
