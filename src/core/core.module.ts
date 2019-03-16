import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageModule } from 'angular-2-local-storage';

import { CustomScrollbarDirective } from './directives/customScrollbar.directive';
import { WidgetSizeDirective } from './directives/wideget-size.directive';
import { LetDirective } from './directives/let.directive';

import { Config } from './config';
import { ServiceConnection } from './serviceConnection';
import { ServiceConnectionFactory } from './serviceConnectionFactory';
import { ServiceNotificationFactory } from './servicetNotificationFactory';
import { AuthenticationService } from './authentication.service';
import { ScreenSizeService } from './screenSize.service';
import { PageTitleService } from './pageTitle.service';
import { ThemeService } from './theme.service';
import { DebouncerService } from './debouncer.service';

@NgModule({
    imports: [
        CommonModule,
        LocalStorageModule.forRoot({
            prefix: 'bitcoin-dashboard',
            storageType: 'localStorage'
        })
    ],
    declarations: [
        CustomScrollbarDirective,
        WidgetSizeDirective,
        LetDirective
    ],
    providers: [
        Config,
        ServiceConnection,
        ServiceConnectionFactory,
        ServiceNotificationFactory,
        AuthenticationService,
        ScreenSizeService,
        PageTitleService,
        ThemeService,
        DebouncerService
    ],
    exports: [
        CustomScrollbarDirective,
        WidgetSizeDirective,
        LetDirective
    ]
})
export class CoreModule { }
