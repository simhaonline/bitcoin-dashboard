import { Component } from '@angular/core';

import { WidgetDefinition } from './..';
import {
    WcChartZoomComponent,
    WcFullscreenComponent
} from './../_widgetControls';

@Component({
    styleUrls: [
        './historicalVolatility.component.scss'
    ],
    templateUrl: './historicalVolatility.component.html'
})
export class HistoricalVolatilityWidgetComponent {
    public static readonly definition: WidgetDefinition = {
        name: 'historicalVolatility'
    };
    public readonly controlComponents: any[] = [
        WcChartZoomComponent,
        WcFullscreenComponent
    ];
}
