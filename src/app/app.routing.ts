import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import {EditProgrammePageComponent} from './edit-programme-page/edit-programme-page.component';
import {LoginPageComponent} from './login-page/login-page.component';

export const AppRoutes: Routes = [{
  path: '',
  component: FullComponent,
  children: [{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }, {
    path: '',
    loadChildren: './material-component/material.module#MaterialComponentsModule'
  }, {
    path: 'home',
    loadChildren: './starter/starter.module#StarterModule'
  }, {
    path: 'view',
    component: EditProgrammePageComponent
  }, {
    path: 'login',
    component: LoginPageComponent
  }]
}];

