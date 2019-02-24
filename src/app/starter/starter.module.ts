import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {SpinnerComponent} from '../shared/spinner.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AngularFileUploaderModule} from 'angular-file-uploader';

@NgModule({
  imports: [
    CommonModule,
    AngularFileUploaderModule,
    MatButtonModule,
    MatBadgeModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatRadioModule,
    RouterModule.forChild(StarterRoutes)
  ],
  declarations: [
    StarterComponent,
    SpinnerComponent,
  ],
  providers: [
    MatSnackBar
  ]
})

export class StarterModule {}
