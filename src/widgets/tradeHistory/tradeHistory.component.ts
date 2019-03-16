import {
    Component
} from '@angular/core';
import _ from 'lodash';

import { WidgetDefinition } from './..';

@Component({
    styleUrls: [
        './tradeHistory.component.scss'
    ],
    templateUrl: './tradeHistory.component.html'
})
export class TradeHistoryWidgetComponent {
    public static readonly definition: WidgetDefinition = {
        name: 'tradeHistory'
    };
}
