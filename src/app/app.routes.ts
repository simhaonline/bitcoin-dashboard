import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { BtcOptionsComponent } from './btc-options';
import { NoContentComponent } from './no-content';

import { SETTING_ROUTE } from './../settings';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent, data: { title: 'BTC Futures' }},
  { path: 'btc-options', component: BtcOptionsComponent, data: { title: 'BTC Options' }},
  SETTING_ROUTE,
  { path: '**',    component: NoContentComponent }
];
