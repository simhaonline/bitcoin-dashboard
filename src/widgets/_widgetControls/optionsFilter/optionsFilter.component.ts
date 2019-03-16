import {
    Component,
    EventEmitter
} from '@angular/core';

export interface DateFilterEntry { label: string; date?: Date; }
export interface FilterValue { min?: number; max?: number; }

@Component({
    selector: 'wc-options-filter',
    template: `
        <div class="options-filter">
            <div class="options-filter__filter">
                <div class="btn-group">
                    <button
                        *ngFor="let dateFilter of dateFilters"
                        type="button"
                        class="btn btn-outline-secondary"
                        [ngClass]="{'active': dateFilter.date === selectedDate}"
                        (click)="setDate(dateFilter.date)"
                    >
                        {{ dateFilter.label }}
                    </button>
                </div>
            </div>
            <div class="options-filter__filter">
                <i class="fa fa-fw fa-crosshairs mr-2"></i>

                <div ngbDropdown class="d-inline-block">
                    <button
                        class="btn btn-outline-secondary"
                        id="btc-options-filter-min"
                        ngbDropdownToggle
                    >{{ values.min }}</button>
                    <div ngbDropdownMenu aria-labelledby="btc-options-filter-min">
                        <button
                            *ngFor="let value of valueOptions"
                            class="dropdown-item"
                            (click)="setValue({ min: value })"
                        >{{ value }}</button>
                    </div>
                </div>

                <span class="mx-2">
                    <i class="fa fa-fw fa-angle-right"></i>
                </span>

                <div ngbDropdown class="d-inline-block">
                    <button
                        class="btn btn-outline-secondary"
                        id="btc-options-filter-max"
                        ngbDropdownToggle
                    >{{ values.max }}</button>
                    <div ngbDropdownMenu aria-labelledby="btc-options-filter-max">
                        <button
                            *ngFor="let value of valueOptions"
                            class="dropdown-item"
                            (click)="setValue({ max: value })"
                        >{{ value }}</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        class: 'widget__options__option widget__options__option--options-filter'
    },
    styleUrls: [
        './optionsFilter.component.scss'
    ]
})
export class WcOptionsFilterComponent {
    public dateFilters: DateFilterEntry[] = [
        { label: 'All', date: null }
    ];
    public selectedDate: Date = null;
    public selectedDateChange = new EventEmitter<Date>();

    public values: FilterValue = {
        min: 7000,
        max: 20000
    };
    public valuesChange = new EventEmitter<FilterValue>();

    public valueOptions: number[] = [];

    constructor() {
        const valuesGenerator = function*(
            min: number = 4000,
            max: number = 20000,
            stepLength: number = 500
        ) {
            const steps = Math.round((max - min) / stepLength);
            for (let i = 0; i < steps; i++) {
                yield min + i * stepLength;
            }
        };

        this.valueOptions = Array.from(valuesGenerator());
    }

    public setDate(newDate: Date) {
        this.selectedDate = new Date();
        this.selectedDateChange.emit(this.selectedDate);
    }

    public setValue(newValue: FilterValue) {
        this.values = { ...this.values, ...newValue };
        this.valuesChange.emit(this.values);
    }
}
