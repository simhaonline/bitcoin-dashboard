import {
    Component
} from '@angular/core';
import moment from 'moment';

import { WidgetType, LayoutItem } from 'widgets';
import { BootstrapLayoutItemOptions } from 'widgets/bootstrapLayout';

@Component({
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public layoutConfig: Array<LayoutItem<BootstrapLayoutItemOptions>> = [
        {
            type: 'row',
            content: [
                {
                    type: 'column',
                    layoutOptions: {
                        md: 4
                    },
                    content: [
                        {
                            type: WidgetType.Single,
                            title: 'BTC Futures',
                            widget: 'futures'
                        },
                        {
                            type: WidgetType.Single,
                            title: 'Markets',
                            widget: 'markets',
                            layoutOptions: {
                                maxHeight: {
                                    min: 200,
                                    value: 500
                                }
                            }
                        },
                        {
                            type: WidgetType.Single,
                            title: 'Recent Trades',
                            widget: 'recentTrades',
                            layoutOptions: {
                                maxHeight: {
                                    min: 200,
                                    value: 500
                                }
                            },
                            widgetData: {
                                targetDate: new Date()
                            }
                        }
                    ]
                },
                {
                    type: 'column',
                    layoutOptions: {
                        md: 8
                    },
                    content: [
                        {
                            type: WidgetType.Single,
                            title: 'Futures Chart',
                            widget: 'tradingView'
                        },
                        {
                            type: WidgetType.Nested,
                            title: 'Order Book',
                            content: [
                                {
                                    title: 'BTC Futures',
                                    subtitle: moment().subtract(2, 'days').format('DD MMM YYYY'),
                                    widget: 'orderBook',
                                    widgetData: {
                                        orderBookIndex: 0
                                    }
                                },
                                {
                                    title: 'BTC Futures',
                                    subtitle: moment().subtract(1, 'day').format('DD MMM YYYY'),
                                    widget: 'orderBook',
                                    widgetData: {
                                        orderBookIndex: 1
                                    }
                                },
                                {
                                    title: 'BTC Futures',
                                    subtitle: moment().format('DD MMM YYYY'),
                                    widget: 'orderBook',
                                    widgetData: {
                                        orderBookIndex: 2
                                    }
                                }
                            ],
                        },
                        {
                            type: WidgetType.Single,
                            title: 'Positions',
                            widget: 'positions'
                        },
                        {
                            type: WidgetType.Nested,
                            content: [
                                {
                                    title: 'Open Orders',
                                    widget: 'openOrders',
                                },
                                {
                                    title: 'Order History',
                                    widget: 'orderHistory',
                                },
                                {
                                    title: 'Trade History',
                                    widget: 'tradeHistory',
                                }
                            ]
                        },
                        {
                            type: WidgetType.Nested,
                            content: [
                                {
                                    title: 'Account Summary',
                                    widget: 'accountSummary',
                                },
                                {
                                    title: 'Futures Summary',
                                    widget: 'futuresSummary',
                                },
                                {
                                    title: 'Options Summary',
                                    widget: 'optionsSummary',
                                }
                            ]
                        },
                        {
                            title: 'Index Chart',
                            subtitle: 'Bitcoin Price Index',
                            type: WidgetType.Single,
                            widget: 'priceIndex'
                        },
                        {
                            title: 'Historical Volatility',
                            type: WidgetType.Single,
                            widget: 'historicalVolatility'
                        },
                        {
                            title: 'Market Depth',
                            type: WidgetType.Single,
                            widget: 'marketDepth'
                        }
                    ]
                }
            ]
        }
    ];
}
