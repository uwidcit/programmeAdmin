import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import {EditProgrammePageComponent} from './edit-programme-page/edit-programme-page.component';

export const AppRoutes: Routes = [{
  path: '',
  component: FullComponent,
  children: [{
    path: '',
    redirectTo: '/upload',
    pathMatch: 'full'
  }, {
    path: '',
    loadChildren: './material-component/material.module#MaterialComponentsModule'
  }, {
    path: 'upload',
    loadChildren: './starter/starter.module#StarterModule'
  }, {
    path: 'edit',
    component: EditProgrammePageComponent
  }]
}];

