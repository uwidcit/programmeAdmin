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
import { FileUploadModule } from 'angular-file-uploader';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ErrorsComponent } from './errors/errors.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import {ViewComponent} from './view/view.component';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {MatDialogModule, MatInputModule} from '@angular/material';
import {DemoMaterialModule} from './demo-material-module';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    FileUploadModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    AuthGuard,
    AuthService
  ],
  entryComponents: [ErrorsComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
