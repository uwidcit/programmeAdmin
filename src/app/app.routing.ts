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
    loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
  }, {
    path: 'home',
    loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule),
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

