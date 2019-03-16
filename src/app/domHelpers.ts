import * as _ from 'lodash';

export function elementHasChild(parent: HTMLElement, target: HTMLElement) {
    let result = false;

    const iterator = (item: HTMLElement) => {
        if (_.includes(item.children, target)) {
            result = true;

            return;
        }

        _.each(item.children, (child: HTMLElement) => {
            iterator(child);
        });
    };

    iterator(parent);

    return result;
}
