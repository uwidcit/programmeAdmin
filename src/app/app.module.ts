import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ErrorsComponent } from './errors/errors.component';
import { AboutComponent } from './about/about.component';
import {LoginComponent} from './login/login.component';
import {ViewComponent} from './view/view.component';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';

import {MatIconModule} from '@angular/material/icon';

import {DemoMaterialModule} from './demo-material-module';
import { SubjectsComponent } from './subjects/subjects.component';
import { UploadComponent } from './upload/upload.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    ViewComponent,
    ErrorsComponent,
    AboutComponent,
    LoginComponent,
    SubjectsComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forRoot(AppRoutes),
    AngularFileUploaderModule,
  ],
  providers: [
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    AuthGuard,
    AuthService
  ],
  entryComponents: [ErrorsComponent, UploadComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
