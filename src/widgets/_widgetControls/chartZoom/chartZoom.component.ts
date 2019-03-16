import { Component, EventEmitter } from '@angular/core';

export interface ChartZoomEntry {
    label: string;
    value: string;
}

@Component({
    selector: 'wc-chart-zoom',
    template: `
        <div class="chart-zoom">
            <span class="chart-zoom__label">
                Zoom:
            </span>
            <div class="btn-group">
                <button
                    *ngFor="let chartZoomEntry of chartZoomEntries"
                    type="button"
                    class="btn btn-outline-secondary"
                    [ngClass]="{'active': chartZoomEntry.value === chartZoom}"
                    (click)="changeZoomValue(chartZoomEntry.value)"
                >
                    {{ chartZoomEntry.label }}
                </button>
            </div>
        </div>
    `,
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        class: 'widget__options__option widget__options__option--chart-zoom'
    },
    styleUrls: ['./chartZoom.component.scss']
})
export class WcChartZoomComponent {
    public chartZoomEntries: ChartZoomEntry[] = [
        { label: '1h', value: '1h' },
        { label: '1d', value: '1d' },
        { label: '2d', value: '2d' },
        { label: '1m', value: '1m' },
        { label: '1y', value: '1y' },
        { label: 'All', value: '' }
    ];

    public chartZoom: string = this.chartZoomEntries[0].value;
    public chartZoomChange = new EventEmitter<string>();

    public changeZoomValue(val: string) {
        this.chartZoom = val;
        this.chartZoomChange.emit(this.chartZoom);
    }
}
