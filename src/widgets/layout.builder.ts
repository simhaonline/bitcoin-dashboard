import _ from 'lodash';

import { LayoutItem, IWidgetFactory } from '.';

export class LayoutBuilder<TLayoutOptions, TWidget> {
    constructor(
        private widgetFactory: IWidgetFactory<any, any>
    ) { }

    public build(items: Array<LayoutItem<TLayoutOptions>>): TWidget {
        return this.mapLayoutTree(items, (item) => this.widgetFactory.getWidget(item));
    }

    private mapLayoutTree(
        tree: Array<LayoutItem<TLayoutOptions>>,
        iterator: (item: LayoutItem<TLayoutOptions>) => TWidget
    ) {
        return _.map(tree, (node) => {
            if (
                _.isArray(node.content) &&
                (node.type === 'row' || node.type === 'stack' || node.type === 'column')
            ) {
                return Object.assign({}, iterator(node), {
                    content: this.mapLayoutTree(node.content, iterator)
                });
            } else {
                return iterator(node);
            }
        });
    }
}
