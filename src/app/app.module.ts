import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { BtcOptionsComponent } from './btc-options';
import { NoContentComponent } from './no-content';

import { SidebarOpenDirective } from './sidebarOpen.directive';

import 'assets/scss/styles.scss';
import 'assets/scss/bootstrap/bootstrap.scss';
import 'assets/scss/font-awesome/font-awesome.scss';
import 'assets/scss/perfect-scrollbar/perfect-scrollbar.scss';

import { WidgetsModule } from './../widgets';
import { NavbarModule } from './../navbar';
import { ComponentsModule } from './../components';
import { CoreModule } from './../core';
import { SettingsModule } from './../settings';

import { apiServices } from 'api-services';
import { reducers } from './reducers';
import { effects } from './effects';

// Application wide providers
const APP_PROVIDERS = [
    ...apiServices
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        BtcOptionsComponent,
        NoContentComponent,

        SidebarOpenDirective
    ],
    /**
     * Import Angular's modules.
     */
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES, {
            useHash: Boolean(history.pushState) === false,
            preloadingStrategy: PreloadAllModules
        }),
        NgbModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),

        WidgetsModule,
        NavbarModule,
        ComponentsModule,
        CoreModule,
        SettingsModule,
    ],
    /**
     * Expose our Services and Providers into Angular's dependency injection.
     */
    providers: [
        APP_PROVIDERS
    ]
})
export class AppModule { }
