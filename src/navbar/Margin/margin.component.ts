import { Component } from '@angular/core';

interface MarginData {
    initialPercentage: number;
    maintenancePercentage: number;
}

@Component({
    selector: 'app-margin',
    styleUrls: [
        './margin.component.scss'
    ],
    templateUrl: './margin.component.html',
})
export class MarginComponent {
    public data: MarginData = {
        initialPercentage: 78,
        maintenancePercentage: 91
    };
}
