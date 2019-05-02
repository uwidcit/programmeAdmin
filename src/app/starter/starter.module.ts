import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {SpinnerComponent} from '../shared/spinner.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule, MatChipsModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {DemoMaterialModule} from '../demo-material-module';

@NgModule({
  imports: [
    CommonModule,
    AngularFileUploaderModule,
    FlexLayoutModule,
    MatButtonModule,
    MatBadgeModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatRadioModule,
    RouterModule.forChild(StarterRoutes),
    MatChipsModule,
    MatProgressBarModule,
    DemoMaterialModule
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
