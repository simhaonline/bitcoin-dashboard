import { Injectable } from '@angular/core';
import _ from 'lodash';

import { Widgets } from './';

@Injectable()
export class WidgetsService {
    public getWidgetType(widgetTypeId: string) {
        return _.find(Widgets, (widget) => widget.definition.name === widgetTypeId);
    }
}
