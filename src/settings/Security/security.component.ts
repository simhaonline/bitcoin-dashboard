import { Component } from '@angular/core';

enum SecurityTab {
    TwoFactorAuthorization = 'two-factor',
    ChangePassword = 'change-password'
}

@Component({
    templateUrl: 'security.component.html',
    styleUrls: [
        './security.component.scss'
    ],
})
export class SecurityComponent {
    public enabledTab = SecurityTab.TwoFactorAuthorization;
    public twoFactorEnabled = false;
}
