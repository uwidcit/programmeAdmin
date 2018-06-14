import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule} from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';
import {FileUploadModule} from 'angular-file-uploader';
import {EditProgrammePageComponent} from '../edit-programme-page/edit-programme-page.component';
import {LoginPageComponent} from '../login-page/login-page.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
      FlexLayoutModule,
    FileUploadModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule.forChild(StarterRoutes)
  ],
  declarations: [
    StarterComponent,
    EditProgrammePageComponent,
    LoginPageComponent
  ]
})

export class StarterModule {}
