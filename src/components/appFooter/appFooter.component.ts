import {
    Component,
} from '@angular/core';

export interface FooterIndex {
    name: string;
    value?: number;
    date?: Date;
    delta?: number;
}

@Component({
    selector: 'app-footer',
    styleUrls: [
        './appFooter.component.scss'
    ],
    templateUrl: './appFooter.component.html',
})
export class AppFooterComponent {
    public indexes: FooterIndex[] = [
        { name: 'Bitfinex' },
        { name: 'Bitstamp', value: 9337.15, date: new Date(), delta: 1 },
        { name: 'GDAX', value: 9337.31, date: new Date(), delta: -1 },
        { name: 'Gemini', value: 9336.85, date: new Date(), delta: 1 },
        { name: 'Itbit', value: 9336.85, date: new Date(), delta: 1 },
        { name: 'Kraken', value: 9336.85, date: new Date(), delta: -1 },
    ];
}
