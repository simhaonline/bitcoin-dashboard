import {
    Component,
    OnInit
} from '@angular/core';
import _ from 'lodash';

import { WidgetDefinition } from './..';
import { WidgetBase } from './../widget.base';
import { WcRecentTradesVolumeComponent } from './../_widgetControls';
import { DataGenerator } from 'core/common';

const BTC_VAL = 8600;

interface RecentTradesOptionsRow {
    assets: string;
    price: number;
    iv: number;
    qty: number;
    date: Date;
}

@Component({
    styleUrls: [
        './recentTradesOptions.component.scss'
    ],
    templateUrl: './recentTradesOptions.component.html'
})
export class RecentTradesOptionsComponent extends WidgetBase implements OnInit {
    public static readonly definition: WidgetDefinition = {
        name: 'recent-trades-options'
    };
    public controlComponents: any[] = [
        WcRecentTradesVolumeComponent
    ];

    public get volume(): number {
        return this.RecentTradesVolumeComponent ? this.RecentTradesVolumeComponent.volume : 0;
    }
    public set volume(vol: number) {
        if (this.RecentTradesVolumeComponent) {
            this.RecentTradesVolumeComponent.volume = vol;
        }
    }

    public data: RecentTradesOptionsRow[] = [];

    private get RecentTradesVolumeComponent(): WcRecentTradesVolumeComponent {
        return this.renderedControlComponents ?
            this.renderedControlComponents.get(WcRecentTradesVolumeComponent) : null;
    }

    private tradesGenerator = new DataGenerator({
        assets: DataGenerator.custom(() => {
            const rnd = Math.random() * 5000 + 6000;
            const val = rnd - (rnd % 500);

            return `BTC-29JUN18-${val}`;
        }),
        price: DataGenerator.custom(() => {
            const btc = Math.random() + 0.02;
            return {
                btc,
                usd: btc * BTC_VAL
            };
        }),
        iv: DataGenerator.between(96, 115),
        qty: DataGenerator.between(1, 3),
        date: DataGenerator.custom(() => new Date())
    });

    public ngOnInit(): void {
        this.data = this.tradesGenerator.generateMany<RecentTradesOptionsRow>(6);

        setTimeout(() => {
            this.volume = Math.round(Math.random() * 100 + 200);
        }, 0);
    }
}
