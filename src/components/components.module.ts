import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgMathPipesModule } from 'angular-pipes';

import {
    SideMenuComponent,
    SideMenuRouteDirective,
    SideMenuTitleDirective
} from './sideMenu';
import { AppFooterComponent } from './appFooter';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgMathPipesModule
    ],
    declarations: [
        SideMenuComponent,
        SideMenuRouteDirective,
        SideMenuTitleDirective,
        AppFooterComponent
    ],
    exports: [
        SideMenuComponent,
        SideMenuRouteDirective,
        SideMenuTitleDirective,
        AppFooterComponent
    ]
})
export class ComponentsModule { }
