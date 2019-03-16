import {
    Component,
    OnInit
} from '@angular/core';
import _ from 'lodash';

import { DataGenerator } from 'core/common';

import { WidgetDefinition } from './..';

interface DataRow {
    starred: boolean;
    coin: string;
    price: number;
    volume: number;
    change: number;
    name: number;
}

@Component({
    styleUrls: [
        './markets.component.scss'
    ],
    templateUrl: './markets.component.html'
})
export class MarketsWidgetComponent implements OnInit {
    public static readonly definition: WidgetDefinition = {
        name: 'markets'
    };

    private dataGenerator = new DataGenerator({
        starred: DataGenerator.boolean(),
        coin: DataGenerator.pick(['FTH', 'LTC', 'RDY', 'STR']),
        price: DataGenerator.between(0, 1),
        volume: DataGenerator.between(300, 20000),
        change: DataGenerator.between(-12, 12),
        name: DataGenerator.pick(['Ripple', 'Decred', 'Golem', 'Stellar'])
    });

    private data: DataRow[] = this.dataGenerator.generateMany<DataRow>(20);

    public ngOnInit(): void {
        this.data = this.dataGenerator.generateMany<DataRow>(20);
    }
}
