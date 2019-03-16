import { Component } from '@angular/core';

@Component({
    selector: 'wc-calc-trigger',
    template: `
        <button
            class="btn btn-link text-muted"
            placement="left"
            ngbTooltip="Run Calculator"
        >
            <i class="fa fa-calculator"></i>
        </button>
    `,
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        class: 'widget__options__option widget__options__option--calc-trigger'
    },
})

export class WcCalcTriggerComponent {
}
