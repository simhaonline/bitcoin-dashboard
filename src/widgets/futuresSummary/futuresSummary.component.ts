import {
    Component
} from '@angular/core';
import _ from 'lodash';

import { WidgetDefinition } from './..';

@Component({
    styleUrls: [
        './futuresSummary.component.scss'
    ],
    templateUrl: './futuresSummary.component.html'
})
export class FuturesSummaryWidgetComponent {
    public static readonly definition: WidgetDefinition = {
        name: 'futuresSummary'
    };
}
