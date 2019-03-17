import {
    Component,
    Input,
    Output,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
    forwardRef,
    EventEmitter
} from '@angular/core';
import _ from 'lodash';

import { WidgetsService } from './../widgets.service';
import { LayoutItem } from './../layout.interface';
import { Widget } from './../widget.interface';
import { BootstrapLayoutItemOptions } from './bootstrap-layout-item.options.interface';
import { ComponentHostDirective } from './component-host.directive';

@Component({
    selector: 'bl-render',
    template: '<ng-template appComponentHost></ng-template>',
    providers: [WidgetsService]
})
export class BlRenderComponent implements OnInit {
    @Input()
    public component: LayoutItem<BootstrapLayoutItemOptions>;
    @Output()
    public componentInstance = new EventEmitter<Widget>();
    @Input()
    public isNested = false;

    // tslint:disable-next-line
    @ViewChild(forwardRef(() => ComponentHostDirective))
    private componentHost: ComponentHostDirective;
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private widgetsService: WidgetsService
    ) { }

    public ngOnInit(): void {
        const widgetType = _.isString(this.component.widget) ?
            this.widgetsService.getWidgetType(this.component.widget) : this.component.widget;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(widgetType);

        const viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        const componentInstance = componentRef.instance as Widget;

        componentInstance.data = this.component.widgetData;

        this.componentInstance.emit(componentInstance);
    }
}
