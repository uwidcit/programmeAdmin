import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';
import {FileUploadModule} from 'angular-file-uploader';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {SpinnerComponent} from '../shared/spinner.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule, MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FileUploadModule,
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
