import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMathPipesModule } from 'angular-pipes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    RouterModule
} from '@angular/router';

import { CoreModule } from './../core';

import { NavbarComponent } from './navbar.component';
import { NavigatorComponent } from './Navigator';
import { SummaryComponent } from './Summary';
import { MarginComponent } from './Margin';
import { ThemeSelectorComponent } from './ThemeSelector';
import { AnnouncementsComponent } from './Announcements';
import { UserMenuComponent } from './UserMenu';
import { LanguageSelectorComponent } from './LanguageSelector';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        RouterModule,
        NgMathPipesModule,
        CoreModule
    ],
    declarations: [
        NavbarComponent,
        NavigatorComponent,
        SummaryComponent,
        MarginComponent,
        ThemeSelectorComponent,
        AnnouncementsComponent,
        UserMenuComponent,
        LanguageSelectorComponent
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule { }
