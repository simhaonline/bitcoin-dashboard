import {
    Component,
    ElementRef,
    AfterContentInit
} from '@angular/core';
import _ from 'lodash';
import uuid from 'uuid';
import { from } from 'rxjs';
import { mergeMap, filter, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as getDataFeeds from 'assets/vendor/trading-view/datafeed.js';
import * as getTradingView from 'assets/vendor/trading-view/trading-view.js';

import FtuDataFeed from './FtuDataFeed';

import { WidgetDefinition } from './..';
import { AppState } from 'store/app.state';
import { Config } from 'core/config';

const DEFAULT_CONFIG = {
    custom_css_url: 'css/dark.css',
    fullscreen: false,
    autosize: true,
    exchanges: [],
    symbol_types: [],
    supported_resolutions: ['1', '3', '5', '15', '30', '60',
    '120', '180', '240', '360', '720', '1D'],
    supports_marks: false,
    supports_timescale_marks: false,
    supports_search: false,
    supports_group_request: false,
    supports_time: false,
    max_bars: 10080,
    interval: 30,
    allow_symbol_change: true,
    use_localstorage_for_settings: true,
    save_chart_properties_to_local_storage: true,
    container_id: 'tv_chart_container',
    library_path: '/assets/vendor/trading-view/',
    locale: 'en',
    drawings_access: {
        type: 'black',
        tools: [{
            name: 'Regression Trend'
        }]
    },
    disabled_features: ['link_to_tradingview', 'volume_force_overlay'],
    enabled_features: [
        'move_logo_to_main_pane',
        'save_chart_properties_to_local_storage',
        'use_localstorage_for_settings'
    ],
    toolbar_bg: '#273142',
    overrides: {
        'mainSeriesProperties.style': 0,
        'symbolWatermarkProperties.color': '#944',
        'volumePaneSize': 'tiny',

        'dataWindowProperties.background': 'rgba(255, 0, 0, 1)',
        'dataWindowProperties.border': 'rgba(255, 0, 0, 1)',

        'paneProperties.background': 'rgba(27, 36, 49, 1)',
        'paneProperties.vertGridProperties.color': 'rgba(37, 48, 63, 1)',
        'paneProperties.horzGridProperties.color': 'rgba(37, 48, 63, 1)',
        'paneProperties.crossHairProperties.color': 'rgba(255, 255, 255, 1)',

        'scalesProperties.backgroundColor': 'rgba(255, 0, 0, 1)',
        'scalesProperties.lineColor': 'rgba(65, 80, 97, 1)',
        'scalesProperties.textColor': 'rgba(127, 143, 164, 1)',

        'mainSeriesProperties.candleStyle.upColor': 'rgba(69, 184, 84, 1)',
        'mainSeriesProperties.candleStyle.downColor': 'rgba(213, 87, 66, 1)',
        'mainSeriesProperties.candleStyle.borderUpColor': 'rgba(55, 148, 67, 1)',
        'mainSeriesProperties.candleStyle.borderDownColor': 'rgba(155, 56, 40, 1)',
        'mainSeriesProperties.candleStyle.wickUpColor': 'rgba(55, 148, 67, 1)',
        'mainSeriesProperties.candleStyle.wickDownColor': 'rgba(155, 56, 40, 1)',
    },
    studies_overrides: {
        'bollinger bands.median.color': '#33FF88',
        'bollinger bands.upper.linewidth': 7
    },
    debug: true,
    time_frames: [],
    // timeframe: '1D',
    favorites: {
        chartTypes: ['Area', 'Line', 'Candlestick']
    }
};

@Component({
    styleUrls: [
        './tradingView.component.scss'
    ],
    template: `
        <div class='trading-view-wrapper'></div>
    `
})
export class TradingViewWidgetComponent implements AfterContentInit {
    public static readonly definition: WidgetDefinition = {
        name: 'tradingView'
    };

    public settings: any = { };

    private tvWidget: any = { };

    constructor(
        private componentElement: ElementRef,
        private store: Store<AppState>,
        private config: Config,
    ) { }

    public async ngAfterContentInit(): Promise<void> {
        const containerId = `chart_${uuid.v1()}`;
        const targetElement =
            this.componentElement.nativeElement.querySelector('.trading-view-wrapper');
        const defaultDatafeed = getDataFeeds();
        const TradingView = getTradingView(defaultDatafeed);
        const targetConfig = Object.assign({}, DEFAULT_CONFIG, this.settings, {
            container_id: containerId,
            symbol: await this.generateSymbol()
        });
        const dataFeed = targetConfig.datafeed = new FtuDataFeed(
            this.tvWidget,
            () => _.omit(targetConfig, 'datafeed'),
            this.config.apiAjaxUrl
        );

        targetElement.id = containerId;
        targetElement.style.height = '500px';
        targetElement.style.display = 'block';

        dataFeed.WidgetInstance = this.tvWidget = new TradingView.widget(targetConfig);
    }

    private async generateSymbol() {
        const activeFuture = await this.store.select('instruments').pipe(
            mergeMap((instrumentsModel) => from(instrumentsModel.currentInstruments)),
            filter((instrument) => instrument.kind === 'future'),
            first((instrument) => instrument.isActive)
        ).toPromise();

        return activeFuture.instrumentName;
    }
}
