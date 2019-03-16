import {
    Component
} from '@angular/core';
import _ from 'lodash';

import { WidgetDefinition } from './..';

@Component({
    styleUrls: [
        './optionsSummary.component.scss'
    ],
    templateUrl: './optionsSummary.component.html'
})
export class OptionsSummaryWidgetComponent {
    public static readonly definition: WidgetDefinition = {
        name: 'optionsSummary'
    };
}
