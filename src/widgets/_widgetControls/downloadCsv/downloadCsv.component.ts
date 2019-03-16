import { Component } from '@angular/core';

@Component({
    selector: 'wc-download-csv',
    template: `
        <button type="button" class="btn btn-primary csv-button">
            <span>Download CSV</span>
            <i class="fa fa-fw fa-download"></i>
        </button>
    `,
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        class: 'widget__options__option widget__options__option--download-csv'
    },
    styleUrls: ['./downloadCSV.component.scss']
})

export class WcDownloadCSVComponent {
}
