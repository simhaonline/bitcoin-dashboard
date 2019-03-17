import { NgModule } from '@angular/core';
import { NgMathPipesModule } from 'angular-pipes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
    BootstrapLayoutComponent,
    BlSingleComponent,
    BlNestedComponent,
    BlRenderComponent,
    ComponentHostDirective,
    WidgetOptionsHostDirective
} from './bootstrapLayout';
import { WidgetsList } from './widgets-list';

import { WcFullscreenComponent } from './_widgetControls/fullscreen';
import { WcTableStyleComponent } from './_widgetControls/tableStyle';
import { WcDownloadCSVComponent } from './_widgetControls/downloadCsv';
import { WcChartZoomComponent } from './_widgetControls/chartZoom';
import { WcCalcTriggerComponent } from './_widgetControls/calcTrigger';
import { WcRecentTradesVolumeComponent } from './_widgetControls/recentTradesVolume';
import { WcOptionsFilterComponent } from './_widgetControls/optionsFilter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CoreModule,
        NgMathPipesModule,
        NgbModule,
        BrowserModule,
        BrowserAnimationsModule,
        OrderModule,
        CoreModule,
        NgxDatatableModule
    ],
    declarations: [
        ...WidgetsList,

        BootstrapLayoutComponent,
        BlSingleComponent,
        BlNestedComponent,
        BlRenderComponent,

        ComponentHostDirective,
        WidgetOptionsHostDirective,

        WcFullscreenComponent,
        WcTableStyleComponent,
        WcDownloadCSVComponent,
        WcChartZoomComponent,
        WcCalcTriggerComponent,
        WcRecentTradesVolumeComponent,
        WcOptionsFilterComponent
    ],
    exports: [
        BootstrapLayoutComponent
    ],
    entryComponents: [
        ...WidgetsList,

        WcFullscreenComponent,
        WcTableStyleComponent,
        WcDownloadCSVComponent,
        WcChartZoomComponent,
        WcCalcTriggerComponent,
        WcRecentTradesVolumeComponent,
        WcOptionsFilterComponent
    ]
})
export class WidgetsModule {}

export * from './widget.interface';
export * from './layout.interface';
