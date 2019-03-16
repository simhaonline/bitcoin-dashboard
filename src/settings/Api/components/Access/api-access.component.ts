import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-api-access',
    templateUrl: 'api-access.component.html'
})

export class ApiAccessComponent {
    @Input()
    public accessKey: string;
    @Input()
    public accessSecret: string;
}
