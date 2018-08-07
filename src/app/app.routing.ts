import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { AuthGuard } from './auth.guard';
import {SubjectsComponent} from './subjects/subjects.component';

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
    loadChildren: './starter/starter.module#StarterModule',
    canActivate: [AuthGuard]
  }, {
    path: 'view',
    canActivate: [AuthGuard],
    component: ViewComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'subjects',
    canActivate: [AuthGuard],
    component: SubjectsComponent
  }, {
    path: 'about',
    canActivate: [AuthGuard],
    component: AboutComponent
  }]
}];

