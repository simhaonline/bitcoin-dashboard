import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

import { AuthenticationService } from 'core/authentication.service';
import { PageTitleService } from 'core/pageTitle.service';

@Component({
    styleUrls: [
        './settings.component.scss'
    ],
    templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit {
    public childTitle = 'Some Title';
    public loggedUserEmail = '';
    public loggedUserName = '';

    constructor(
        private authService: AuthenticationService,
        pageTitleService: PageTitleService
    ) {
        pageTitleService.title.subscribe((titles) => {
            this.childTitle = _.last(titles);
        });
    }

    public ngOnInit() {
        this.loggedUserEmail = this.authService.loggedUser.email;
        this.loggedUserName = this.authService.loggedUser.userName;
    }
}
