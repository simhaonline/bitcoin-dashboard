import {
    Component
} from '@angular/core';

interface NavigatorItem {
    type: string;
    url?: string;
    name?: string;
    iconClass?: string;
}

@Component({
    selector: 'app-navigator',
    styleUrls: [
        './navigator.component.scss'
    ],
    templateUrl: './navigator.component.html',
})
export class NavigatorComponent {
    public items: NavigatorItem[] = [
        { type: 'link', url: '/', name: 'BTC Futures', iconClass: 'fa fa-calendar-o fa-fw' },
        { type: 'link', url: '/', name: 'BTC Options', iconClass: 'fa fa-calendar-o fa-fw' },
        { type: 'separator' },
        { type: 'link', url: '/', name: 'Insurance', iconClass: 'fa fa-umbrella fa-fw' },
    ];
    public selectedItem: NavigatorItem = this.items[0];
}
