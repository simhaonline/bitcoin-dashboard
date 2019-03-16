import {
    Component
} from '@angular/core';
import _ from 'lodash';

import { WidgetDefinition } from './..';
import { WidgetBase } from './../widget.base';
import { WcCalcTriggerComponent, WcDownloadCSVComponent } from './../_widgetControls';

@Component({
    styleUrls: [
        './futures.component.scss'
    ],
    templateUrl: './futures.component.html'
})
export class FuturesWidgetComponent extends WidgetBase  {
    public static readonly definition: WidgetDefinition = {
        name: 'futures'
    };
    public controlComponents: any[] = [
        WcCalcTriggerComponent
    ];
    public data: any = null;
}
