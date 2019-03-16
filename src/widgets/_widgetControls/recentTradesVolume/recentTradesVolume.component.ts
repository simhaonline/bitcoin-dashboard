import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wd-recent-trades-volume',
    template: `
        <span class="text-muted">24h volume: {{ volume }}</span>
    `,
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        class: 'widget__options__option widget__options__option--recent-trades-volume'
    },
})

export class WcRecentTradesVolumeComponent {
    public volume: number = 0;
}
