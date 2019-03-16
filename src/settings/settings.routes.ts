import { SettingsComponent } from './Settings';
import { AccountSettingsComponent } from './AccountSettings';
import { MyAccountComponent } from './MyAccount';
import { WithdrawComponent } from './Withdraw';
import { DepositComponent } from './Deposit';
import { SecurityComponent } from './Security';
import { ApiComponent } from './Api';
import { StatisticsComponent } from './Statistics';
import { TransactionLogComponent } from './TransactionLog';
import { AffiliateComponent } from './Affiliate';

export const SETTING_ROUTE = {
    path: 'settings',
    component: SettingsComponent,
    children: [
        {path: '', component: AccountSettingsComponent, data: { title: 'Settings' }},
        {path: 'my-account', component: MyAccountComponent, data: { title: 'My Account' }},
        {path: 'security', component: SecurityComponent, data: { title: 'Security' }},
        {path: 'withdraw', component: WithdrawComponent, data: { title: 'Withdraw' }},
        {path: 'deposit', component: DepositComponent, data: { title: 'Deposit' }},
        {path: 'api', component: ApiComponent, data: { title: 'Api' }},
        {path: 'statistics', component: StatisticsComponent, data: { title: 'Statistics' }},
        {
            path: 'transaction-log',
            component: TransactionLogComponent,
            data: { title: 'Transaction Log' }
        },
        {path: 'affilate', component: AffiliateComponent, data: { title: 'Affilate' }},
    ]
};
