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

import { AccountSummaryWidgetComponent } from './accountSummary';
import { FuturesWidgetComponent } from './futures';
import { FuturesSummaryWidgetComponent } from './futuresSummary';
import { MarketDepthWidgetComponent } from './marketDepth';
import { MarketsWidgetComponent } from './markets';
import { OpenOrdersWidgetComponent } from './openOrders';
import { OptionsSummaryWidgetComponent } from './optionsSummary';
import { OrderBookWidgetComponent } from './orderBook';
import { OrderHistoryWidgetComponent } from './orderHistory';
import { PositionsWidgetComponent } from './positions';
import { RecentTradesWidgetComponent } from './recentTrades';
import { TradeHistoryWidgetComponent } from './tradeHistory';
import { TradingViewWidgetComponent } from './tradingView';
import { PriceIndexWidgetComponent } from './priceIndex';
import { HistoricalVolatilityWidgetComponent } from './historicalVolatility';
import { BtcOptionsTableComponent } from './btc-options-table';
import { RecentTradesOptionsComponent } from './recentTradesOptions';

import { WcFullscreenComponent } from './_widgetControls/fullscreen';
import { WcTableStyleComponent } from './_widgetControls/tableStyle';
import { WcDownloadCSVComponent } from './_widgetControls/downloadCsv';
import { WcChartZoomComponent } from './_widgetControls/chartZoom';
import { WcCalcTriggerComponent } from './_widgetControls/calcTrigger';
import { WcRecentTradesVolumeComponent } from './_widgetControls/recentTradesVolume';
import { WcOptionsFilterComponent } from './_widgetControls/optionsFilter';

const Widgets = [
    AccountSummaryWidgetComponent,
    FuturesWidgetComponent,
    FuturesSummaryWidgetComponent,
    MarketDepthWidgetComponent,
    MarketsWidgetComponent,
    OpenOrdersWidgetComponent,
    OptionsSummaryWidgetComponent,
    OrderBookWidgetComponent,
    OrderHistoryWidgetComponent,
    PositionsWidgetComponent,
    RecentTradesWidgetComponent,
    TradeHistoryWidgetComponent,
    TradingViewWidgetComponent,
    PriceIndexWidgetComponent,
    HistoricalVolatilityWidgetComponent,
    BtcOptionsTableComponent,
    RecentTradesOptionsComponent
];

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
        ...Widgets,

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
        ...Widgets,

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

export {
    Widgets,
    WidgetOptionsHostDirective
};

export * from './widget.interface';
export * from './layout.interface';
