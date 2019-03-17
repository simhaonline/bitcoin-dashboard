import { Injectable } from '@angular/core';
import _ from 'lodash';

import { WidgetsList } from './widgets-list';

@Injectable()
export class WidgetsService {
    public getWidgetType(widgetTypeId: string) {
        return _.find(WidgetsList, (widget) => widget.definition.name === widgetTypeId);
    }
}
