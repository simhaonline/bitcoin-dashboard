import {
    Component
} from '@angular/core';
import _ from 'lodash';

import { WidgetDefinition } from './..';

@Component({
    styleUrls: [
        './orderHistory.component.scss'
    ],
    templateUrl: './orderHistory.component.html'
})
export class OrderHistoryWidgetComponent {
    public static readonly definition: WidgetDefinition = {
        name: 'orderHistory'
    };
}
