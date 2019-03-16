import {
    Directive,
    ElementRef,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import _ from 'lodash';

const SIZE_CLASS_MAP = {
    'wd-size--xs': { max: 288 },
    'wd-size--sm': { min: 288, max: 334 },
    'wd-size--md': { min: 334, max: 496 },
    'wd-size--lg': { min: 496, max: 600 },
    'wd-size--xl': { min: 600, max: 780 },
    'wd-size--xxl': { min: 780 }
};

@Directive({
    selector: '[widget-size]'
})
/**
 * Applies a specific class to the browser container element
 * based on the size of the widget - allows for better responsiveness
 * inside of single widgets
 */
export class WidgetSizeDirective implements AfterViewInit, OnDestroy {
    private widgetElement: HTMLElement;
    private boundExec: EventListenerOrEventListenerObject;

    constructor(
        elementRef: ElementRef
    ) {
        if (window) {
            this.boundExec = this.execute.bind(this);

            window.addEventListener('resize', this.boundExec);

            this.widgetElement = elementRef.nativeElement;
        }
    }

    public ngAfterViewInit(): void {
        if (window) {
            this.execute();
        }
    }

    public ngOnDestroy(): void {
        if (window) {
            window.removeEventListener('resize', this.boundExec);
        }
    }

    private clearSizeClasses(): void {
        // tslint:disable
        for (let i = 0; i < this.widgetElement.classList.length; i++) {
            const className = this.widgetElement.classList.item(i);
            if (className.indexOf('wd-size--') >= 0) {
                this.widgetElement.classList.remove(className);
            }
        }
        // tslint:enable
    }

    private execute() {
        const elementRect = this.widgetElement.getBoundingClientRect();
        const width = Math.round(elementRect.width);

        this.clearSizeClasses();

        if (width > 0) {
            // Apply BS sizes
            _.forOwn(SIZE_CLASS_MAP, (val: { min: number, max: number }, key: string) => {
                const { min, max } = val;
                if (
                    (!min || min <= width) &&
                    (!max || max > width)
                ) {
                    this.widgetElement.classList.add(key);
                }
            });
        }
    }
}
