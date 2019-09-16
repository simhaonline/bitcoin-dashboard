import {
    Component,
    ElementRef,
    AfterContentInit,
    OnDestroy,
} from '@angular/core';
import _ from 'lodash';
import uuid from 'uuid';

import { WidgetDefinition } from './..';
import { TradingViewService } from 'core/tradingView.service';
import { ThemeService, ThemeStyle } from 'core/theme.service';

const DEFAULT_CONFIG = {
    theme: 'dark',
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
export class TradingViewWidgetComponent implements AfterContentInit, OnDestroy {
    public static readonly definition: WidgetDefinition = {
        name: 'tradingView'
    };

    public settings: any = { };

    private tvWidget: any = { };

    constructor(
        private componentElement: ElementRef,
        private tradingView: TradingViewService,
        private themeService: ThemeService,
    ) {
        this.themeService.onStyleChange.subscribe(this.themeChangedHandler.bind(this));
    }

    public async ngAfterContentInit(): Promise<void> {
        this.initTradingView(this.themeService.style);
    }

    public ngOnDestroy(): void {
        if (this.tvWidget) {
            this.tvWidget.remove();
        }
    }

    private initTradingView(style: ThemeStyle) {
        const containerId = `chart_${uuid.v1()}`;
        const targetElement =
            this.componentElement.nativeElement.querySelector('.trading-view-wrapper');
        const targetConfig = Object.assign({}, DEFAULT_CONFIG, this.settings, {
            container_id: containerId,
            symbol: 'BTCUSD',
            theme: style === ThemeStyle.Dark ? 'dark' : 'light'
        });
        targetElement.id = containerId;
        targetElement.style.height = '500px';
        targetElement.style.display = 'block';

        const TradingView = this.tradingView.getPrototype();

        this.tvWidget = new TradingView.widget(targetConfig);
    }

    private themeChangedHandler(style) {
        this.tvWidget.options.theme = style === ThemeStyle.Dark ? 'dark' : 'light';

        this.tvWidget.reload();
    }
}
