import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule} from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';
import {FileUploadModule} from 'angular-file-uploader';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
      FlexLayoutModule,
    FileUploadModule,
    MatBadgeModule,
    MatSnackBarModule,
    RouterModule.forChild(StarterRoutes)
  ],
  declarations: [
    StarterComponent,
  ]
})

export class StarterModule {}
