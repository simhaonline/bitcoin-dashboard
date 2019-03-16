import { Component, Input, Output, EventEmitter } from '@angular/core';

export enum TableStyle {
    Table = 'table-style__table',
    Split = 'table-style__split'
}

@Component({
    selector: 'wc-table-style',
    template: `
        <div class="ts">
            <span class="ts__label">
                Show as:
            </span>

            <button
                type="button"
                class="ts__action btn btn-link btn-xs"
                (click)="changeStyle('table-style__table')"
                [ngClass]="{'active': style === 'table-style__table'}"
                ngbTooltip="Switch to Table View"
                placement="left"
            >
                <i class="fa fa-fw fa-bars"></i>
            </button>
            <button
                type="button"
                class="ts__action btn btn-link btn-xs"
                (click)="changeStyle('table-style__split')"
                [ngClass]="{'active': style === 'table-style__split'}"
                ngbTooltip="Switch to Split View"
                placement="left"
            >
                <i class="fa fa-fw fa-columns"></i>
            </button>
        </div>
    `,
    styleUrls: ['./wcTableStyle.component.scss'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        class: 'widget__options__option widget__options__option--table-style'
    }
})
export class WcTableStyleComponent {
    @Input()
    public style: TableStyle = TableStyle.Table;
    @Output()
    public styleChange = new EventEmitter<TableStyle>();

    public changeStyle(newStyle: TableStyle) {
        this.style = newStyle;
        this.styleChange.emit(newStyle);
    }
}
