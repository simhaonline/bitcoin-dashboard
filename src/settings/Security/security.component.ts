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
    public twoFactorEnabled = false;
    public set enabledTab(tab: string) {
        this.tab = tab as SecurityTab;
    }
    public get enabledTab(): string {
        return this.tab as string;
    }

    private tab = SecurityTab.TwoFactorAuthorization;
}
