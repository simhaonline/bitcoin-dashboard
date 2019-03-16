import {
    Component
} from '@angular/core';
import _ from 'lodash';

import { WidgetDefinition } from './..';

@Component({
    styleUrls: [
        './marketDepth.component.scss'
    ],
    templateUrl: './marketDepth.component.html'
})
export class MarketDepthWidgetComponent {
    public static readonly definition: WidgetDefinition = {
        name: 'marketDepth'
    };
}
