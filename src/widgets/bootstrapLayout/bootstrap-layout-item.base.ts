import {
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ViewChild,
    forwardRef,
    ComponentFactoryResolver
} from '@angular/core';
import Velocity from 'velocity-animate';

import { WidgetOptionsHostDirective } from './widget-options-host.directive';
import { WidgetWithOptions, LayoutItem } from '..';
import { WidgetHeader } from '../widget-header.interface';
import { BootstrapLayoutItemOptions } from '.';

const animate = (
    cb: (duration: number) => void,
    easingFunc: (duration: number) => number,
    duration: number,
    startDateTicks: number = Date.now()
) => {
    const currentDateTicks = (new Date()).valueOf();
    const diffTicks = currentDateTicks - startDateTicks;

    cb(easingFunc(diffTicks / duration));

    if (diffTicks < duration) {
        window.requestAnimationFrame(() => {
            animate(cb, easingFunc, duration, startDateTicks);
        });
    }
};

export class BootstrapLayoutItem {
    @Input()
    public set highlightStatus(status: string) {
        this.highlight = status;

        const widgetElement = this.elementRef.nativeElement;

        if (status === 'scroll-blink') {
            const documentElement = widgetElement.ownerDocument;
            const body = documentElement.querySelector('html');
            const html = documentElement.querySelector('body');

            window.requestAnimationFrame(() => {
                const targetScroll = widgetElement.offsetTop
                    - (widgetElement.scrollHeight * 0.75);

                Velocity.animate(body, 'scroll', {
                    duration: 300,
                    offset: targetScroll,
                    easing: [0.215, 0.610, 0.355, 1.000]
                });

                setTimeout(() => {
                    this.highlightItem(null);
                }, 1500);
            });
        }
    }
    public get highlightStatus(): string {
        return this.highlight;
    }

    @Input()
    public set isFullscreen(val: boolean) {
        this.fullscreen = val;
    }
    public get isFullscreen(): boolean {
        return this.fullscreen;
    }
    @Output()
    public fullscreenChanged = new EventEmitter
        <{ nestedComponent?: LayoutItem<BootstrapLayoutItemOptions>, fullscreen: boolean }>();

    // tslint:disable-next-line:no-forward-ref
    @ViewChild(forwardRef(() => WidgetOptionsHostDirective))
    public set widgetOptionsHost(host: WidgetOptionsHostDirective) {
        if (
            this.renderedComponentInstance &&
            this.renderedComponentInstance.controlComponents &&
            (host || this.renderedComponentInstance.widgetOptionsHost)
        ) {
            const instancesMap = new WeakMap<any, any>();
            const hostContainerRef = host ? host.viewContainerRef :
                this.renderedComponentInstance.widgetOptionsHost.viewContainerRef;

            hostContainerRef.clear();

            for (const componentType of this.renderedComponentInstance.controlComponents) {
                const componentFactory =
                    this.componentFactoryResolver.resolveComponentFactory(componentType);

                const componentRef = hostContainerRef.createComponent(componentFactory);
                const componentInstance = componentRef.instance as WidgetHeader;
                instancesMap.set(componentType, componentInstance);

                // Populate WidgetHeader fields
                componentInstance.ownerLayoutComponent = this;
            }

            if (this.renderedComponentInstance.controlComponentsInstances) {
                this.renderedComponentInstance.controlComponentsInstances(instancesMap);
            }
        }
    }

    @Output()
    public itemHighlight: EventEmitter<any> = new EventEmitter();

    protected fullscreen = false;
    private highlight: string = null;
    private renderedComponentInstance: WidgetWithOptions;

    constructor(
        private elementRef: ElementRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    public toggleFullscreen(enabled: boolean) {
        this.fullscreenChanged.emit({ fullscreen: enabled });
    }

    protected highlightItem(itemId: string, highlightStatus: string = 'constant') {
        this.itemHighlight.emit({
            itemId,
            highlight: highlightStatus
        });
    }

    protected onComponentInstance(component: WidgetWithOptions) {
        this.renderedComponentInstance = component;
    }
}
