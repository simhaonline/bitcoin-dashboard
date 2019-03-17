import {
    Component,
    Input,
    Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import uuid from 'uuid';
import _ from 'lodash';

import { LayoutItem } from 'widgets/layout.interface';
import { BootstrapLayoutItemOptions } from './bootstrap-layout-item.options.interface';
import { WidgetType } from 'widgets/widget.interface';


@Component({
    selector: 'app-bootstrap-layout',
    templateUrl: './bootstrap-layout.component.html',
    styleUrls: [
        './bootstrap-layout.component.scss'
    ]
})
export class BootstrapLayoutComponent {
    @Input()
    set layout(value: Array<LayoutItem<BootstrapLayoutItemOptions>>) {
        this.rawLayout = value;
        // TODO: Will need some deep compare stuff to recover existing refs on change
        this.layoutItems = _.map(value, (layoutItem) => this.transform(layoutItem));
    }

    private rawLayout: Array<LayoutItem<BootstrapLayoutItemOptions>> = [];

    private WidgetType = WidgetType;
    private layoutItems: Array<LayoutItem<BootstrapLayoutItemOptions>> = [];
    private fullscreenItem: LayoutItem<BootstrapLayoutItemOptions> = null;
    private reattachFullscreenItem = false;

    private highlightedItem?: { itemId: string; state: string } = null;

    constructor(@Inject(DOCUMENT) private document: Document) { }

    private transform(
        layoutItem: LayoutItem<BootstrapLayoutItemOptions>,
        overrides?: any
    ): LayoutItem<BootstrapLayoutItemOptions> {
        switch (layoutItem.type) {
            case WidgetType.Nested:
                const parentId = uuid.v4();

                return {
                    ...layoutItem,
                    id: parentId,
                    content: layoutItem.content.map(
                        (childItem, index) => this.transform(childItem, {
                            type: WidgetType.Single,
                            parentId,
                            childIndex: index,
                            parentTitle: layoutItem.title,
                            isAttached: true
                        })
                    )
                };
            default:
                const output = {
                    ...layoutItem,
                    id: uuid.v4(),
                    isAttached: false,
                    ...overrides
                };

                if (!_.isEmpty(layoutItem.content)) {
                    output.content = layoutItem.content.map(
                        (childItem) => this.transform(childItem)
                    );
                }

                return output;
        }
    }

    public getColClass(colItem: LayoutItem<BootstrapLayoutItemOptions>) {
        const { layoutOptions: options } = colItem;
        let classString = '';

        if (colItem.type === 'column') {
            classString += options.sm ? `col-sm-${options.sm} ` : '';
            classString += options.md ? `col-md-${options.md} ` : '';
            classString += options.lg ? `col-lg-${options.lg} ` : '';
            classString += options.xl ? `col-xl-${options.xl} ` : '';
        }

        return classString;
    }

    public dettachChild(childComponent: LayoutItem<BootstrapLayoutItemOptions>) {
        const iterator = (items: Array<LayoutItem<BootstrapLayoutItemOptions>>) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];

                if (item.type === WidgetType.Nested) {
                    if (item.id === childComponent.parentId) {
                        items.splice(i + 1, 0, childComponent);
                    }
                    if (_.includes(item.content, childComponent)) {
                        const targetIndex = item.content.indexOf(childComponent);
                        item.content.splice(targetIndex, 1);
                        item.isAttached = false;
                        break;
                    }
                }

                if (item.content) {
                    iterator(item.content);
                }
            }
        };

        iterator(this.layoutItems);
    }

    public reattachChild(childComponent: LayoutItem<BootstrapLayoutItemOptions>) {
        const iterator = (items: Array<LayoutItem<BootstrapLayoutItemOptions>>) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];

                if (item.type === WidgetType.Nested && item.id === childComponent.parentId) {
                    item.content.splice(childComponent.childIndex, 0, childComponent);
                    item.isAttached = true;
                    continue;
                }

                if (item.id && item.id === childComponent.id) {
                    items.splice(i, 1);
                    break;
                }

                if (item.content) {
                    iterator(item.content);
                }
            }
        };

        iterator(this.layoutItems);
    }

    public toggleContent(contentHidden: boolean) {
        if (contentHidden) {
            this.document.body.classList.add('content-hidden');
        } else {
            this.document.body.classList.remove('content-hidden');
        }
    }

    public toggleFullscreen(
        enabled: boolean,
        childComponent?: LayoutItem<BootstrapLayoutItemOptions>
    ) {
        if (enabled) {
            this.reattachFullscreenItem = childComponent.isAttached;

            if (childComponent.parentId && childComponent.isAttached) {
                this.dettachChild(childComponent);
            }

            this.fullscreenItem = childComponent;
        } else {
            this.fullscreenItem = null;

            if (this.reattachFullscreenItem) {
                this.reattachChild(childComponent);
            }
        }

        this.toggleContent(enabled);
    }
}
