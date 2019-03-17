import { Component } from '@angular/core';
import moment from 'moment';
import _ from 'lodash';

export interface UserStat {
    period: string;
    futuresVolume: {
        btc: number;
        usd: number;
    };
    optionsVolume: number;
    payedFees: number;
}

@Component({
    styleUrls: [
        './statistics.component.scss'
    ],
    templateUrl: 'statistics.component.html'
})
export class StatisticsComponent {
    public stats: UserStat[] = [
        {
            period: 'Last 24 Hours',
            futuresVolume: { btc: 0.0001, usd: 5 },
            optionsVolume: 0,
            payedFees: 0
        },
        {
            period: 'Last 7 Days',
            futuresVolume: { btc: 0.002, usd: 22 },
            optionsVolume: 0,
            payedFees: 0
        },
        {
            period: 'Last 30 Days',
            futuresVolume: { btc: 0, usd: 0 },
            optionsVolume: 0,
            payedFees: 0
        },
        {
            period: `Year ${moment().year() - 1}`,
            futuresVolume: { btc: 0, usd: 0 },
            optionsVolume: 0,
            payedFees: 0
        },
        {
            period: `Year ${moment().year()} up to date`,
            futuresVolume: { btc: 0, usd: 0 },
            optionsVolume: 0,
            payedFees: 0
        }
    ];

    constructor() {
        this.stats.push(
            _.reduce(this.stats, (mem: UserStat, part: UserStat) => ({
                    ...mem,
                    futuresVolume: {
                        btc: mem.futuresVolume.btc + part.futuresVolume.btc,
                        usd: mem.futuresVolume.usd + part.futuresVolume.usd
                    },
                    optionsVolume: mem.optionsVolume + part.optionsVolume,
                    payedFees: mem.payedFees + part.payedFees
            }), {
                period: 'Total',
                futuresVolume: { btc: 0, usd: 0 },
                optionsVolume: 0,
                payedFees: 0
            })
        );
    }
}
