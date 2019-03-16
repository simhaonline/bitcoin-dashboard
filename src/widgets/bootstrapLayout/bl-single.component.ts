import {
    Component,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ComponentFactoryResolver
} from '@angular/core';

import { LayoutItem } from './..';
import { BootstrapLayoutItemOptions } from '.';
import { BootstrapLayoutItem } from './bootstrap-layout-item.base';
import { getAnimationMeta as getCollapseAnimationMeta } from './collapse.animation';

@Component({
    selector: 'bl-single',
    templateUrl: './bl-single.component.html',
    animations: [
        getCollapseAnimationMeta()
    ]
})
export class BlSingleComponent extends BootstrapLayoutItem {
    @Input()
    public component: LayoutItem<BootstrapLayoutItemOptions>;
    @Output()
    public reattach: EventEmitter<any> = new EventEmitter();

    private set isCollapsed(value: boolean) {
        this.collapseState = value ? 'collapsed' : 'visible';
    }
    private get isCollapsed(): boolean {
        return this.collapseState === 'collapsed';
    }

    private collapseState = 'visible';

    constructor(elementRef: ElementRef, componentFactory: ComponentFactoryResolver) {
        super(elementRef, componentFactory);
    }

    public toggleFullscreen(enabled: boolean) {
        this.fullscreenChanged.emit({
            fullscreen: enabled,
            nestedComponent: this.component
        });
    }

    public toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }

    public onReattachClick(ev: Event) {
        ev.stopImmediatePropagation();

        this.highlightItem(this.component.parentId, 'scroll-blink');

        this.reattach.emit({ component: this.component });
    }
}
