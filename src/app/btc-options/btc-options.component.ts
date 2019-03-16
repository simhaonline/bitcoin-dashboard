import {
    Component
} from '@angular/core';

import { WidgetType, LayoutItem } from 'widgets';
import { BootstrapLayoutItemOptions } from 'widgets/bootstrapLayout';

@Component({
    selector: 'btc-options',
    templateUrl: './btc-options.component.html'
})
export class BtcOptionsComponent {
    public layoutConfig: Array<LayoutItem<BootstrapLayoutItemOptions>> = [
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
                },
                {
                    title: 'Index Chart',
                    widget: 'priceIndex',
                },
                {
                    title: 'Historical Volatility',
                    widget: 'historicalVolatility',
                }
            ]
        },
        {
            type: WidgetType.Single,
            title: 'BTC Options',
            widget: 'btc-options-table'
        },
        {
            type: WidgetType.Nested,
            content: [
                {
                    title: 'Open Orders',
                    widget: 'openOrders'
                },
                {
                    title: 'Order History',
                    widget: 'orderHistory'
                },
                {
                    title: 'Trade History',
                    widget: 'tradeHistory'
                },
                {
                    title: 'Positions',
                    widget: 'positions'
                }
            ]
        },
        {
            type: 'row',
            content: [
                {
                    type: 'column',
                    layoutOptions: {
                        md: 6
                    },
                    content: [
                        {
                            type: WidgetType.Single,
                            title: 'Recent Trades CALLS',
                            widget: 'recent-trades-options'
                        }
                    ]
                },
                {
                    type: 'column',
                    layoutOptions: {
                        md: 6
                    },
                    content: [
                        {
                            type: WidgetType.Single,
                            title: 'Recent Trades PUTS',
                            widget: 'recent-trades-options'
                        }
                    ]
                }
            ]
        }
    ];
}
