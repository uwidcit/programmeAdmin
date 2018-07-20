import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import {EditProgrammePageComponent} from './edit-programme-page/edit-programme-page.component';
import {AboutComponent} from './about/about.component';
// import {LoginComponent} from './login/login.component';

export const AppRoutes: Routes = [{
  path: '',
  component: FullComponent,
  children: [{
    path: '',
    redirectTo: '/home',
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
  },
  //   {
  //   path: 'login',
  //   component: LoginComponent
  // },
    {
    path: 'about',
    component: AboutComponent
  }]
}];

