import {
    Component,
    Input,
    Output,
    OnInit,
    EventEmitter,
    DoCheck,
    IterableDiffer,
    IterableDiffers,
    ElementRef,
    ComponentFactoryResolver
} from '@angular/core';
import _ from 'lodash';

import { LayoutItem } from './..';
import { BootstrapLayoutItemOptions } from '.';
import { getAnimationMeta as getCollapseAnimationMeta } from './collapse.animation';
import { BootstrapLayoutItem } from './bootstrap-layout-item.base';

@Component({
    selector: 'bl-nested',
    templateUrl: './bl-nested.component.html',
    animations: [
        getCollapseAnimationMeta()
    ]
})
export class BlNestedComponent extends BootstrapLayoutItem implements DoCheck {
    @Input()
    public component: LayoutItem<BootstrapLayoutItemOptions>;

    @Input()
    set isCollapsed(value: boolean) {
        this.collapseState = value ? 'collapsed' : 'visible';
    }
    get isCollapsed() {
        return this.collapseState === 'collapsed';
    }
    public collapseState = 'visible';
    @Output()
    public dettach: EventEmitter<any> = new EventEmitter();

    private activeComponentId?: string;
    private iterableDiffer: IterableDiffer<any>;

    constructor(
        private iterableDiffers: IterableDiffers,
        elementRef: ElementRef,
        componentFactory: ComponentFactoryResolver
    ) {
        super(elementRef, componentFactory);
        this.iterableDiffer = this.iterableDiffers.find([]).create(null);
    }

    public ngDoCheck(): void {
        const childrenChanger = this.iterableDiffer.diff(this.component.content);
        if (childrenChanger) {
            if (
                !this.activeComponentId ||
                    !_.includes(this.component.content, { id: this.activeComponentId }) ||
                        this.component.content.length > 0
            ) {
                this.activeComponentId = _.first(this.component.content).id;
            }
        }
    }

    public toggleFullscreen(enabled: boolean) {
        const nestedComponent = _.find(this.component.content,
            { id: this.activeComponentId });
        this.fullscreenChanged.emit({ fullscreen: enabled, nestedComponent });
    }

    public toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }

    public setActiveTab(componentId: string) {
        this.isCollapsed = false;
        this.activeComponentId = componentId;
    }

    public onDettachClick(e: Event, childComponent: LayoutItem<BootstrapLayoutItemOptions>) {
        e.stopImmediatePropagation();

        this.highlightItem(childComponent.id, 'scroll-blink');
        this.dettach.emit({ component: childComponent });
    }
}
