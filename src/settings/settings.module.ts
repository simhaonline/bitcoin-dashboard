import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMathPipesModule } from 'angular-pipes';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';

import { CoreModule } from './../core';

import { SettingsComponent } from './Settings';
import { MyAccountComponent } from './MyAccount';
import { AccountSettingsComponent } from './AccountSettings';
import { WithdrawComponent } from './Withdraw';
import { DepositComponent } from './Deposit';
import { SecurityComponent } from './Security';
import { ApiComponent } from './Api';
import { ApiAccessComponent } from './Api/components/Access';
import { ApiConsoleComponent } from './Api/components/ApiConsole';
import { StatisticsComponent } from './Statistics';
import { TransactionLogComponent } from './TransactionLog';
import { AffiliateComponent } from './Affiliate';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        CoreModule,
        RouterModule,
        NgMathPipesModule,
        NgxDatatableModule,
        ToastrModule
    ],
    declarations: [
        SettingsComponent,
        MyAccountComponent,
        AccountSettingsComponent,
        WithdrawComponent,
        DepositComponent,
        SecurityComponent,
        ApiComponent,
        ApiAccessComponent,
        ApiConsoleComponent,
        StatisticsComponent,
        TransactionLogComponent,
        AffiliateComponent
    ],
    exports: [
    ]
})
export class SettingsModule { }
