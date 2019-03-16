import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WidgetHeader } from './../../widget-header.interface';
import { BootstrapLayoutItem } from './../../bootstrapLayout/bootstrap-layout-item.base';

@Component({
    selector: 'wc-fullscreen',
    template: `
        <button
            class="btn btn-sm btn-link trigger"
            [ngClass]="{'active': enabled}"
            (click)="toggle()"
            ngbTooltip="Toggle Fullscreen"
            placement="left"
        >
            <i class="fa fa-fw fa-expand"></i>
        </button>
    `,
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        class: 'widget__options__option widget__options__option--fullscreen'
    },
    styleUrls: [
        './fullscreen.component.scss'
    ]
})
export class WcFullscreenComponent implements WidgetHeader {
    @Input()
    public enabled = false;
    @Output()
    public enabledChange = new EventEmitter<boolean>();

    public get ownerLayoutComponent(): BootstrapLayoutItem {
        return this.layoutComponent;
    }
    public set ownerLayoutComponent(layoutComponent: BootstrapLayoutItem) {
        this.layoutComponent = layoutComponent;

        this.enabled = this.ownerLayoutComponent.isFullscreen;
    }

    private layoutComponent: BootstrapLayoutItem;

    private toggle() {
        this.enabled = !this.ownerLayoutComponent.isFullscreen;
        this.ownerLayoutComponent.toggleFullscreen(this.enabled);
        this.enabledChange.emit(this.enabled);
    }
}
