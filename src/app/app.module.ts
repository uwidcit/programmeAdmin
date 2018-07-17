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
import { DemoMaterialModule} from './demo-material-module';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { EditProgrammePageComponent } from './edit-programme-page/edit-programme-page.component';
import { FileUploadModule } from 'angular-file-uploader';
import { LoginPageComponent } from './login-page/login-page.component';
import { ErrorsComponent } from './errors/errors.component';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    EditProgrammePageComponent,
    LoginPageComponent,
    ErrorsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    FileUploadModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }
  ],
  entryComponents: [ErrorsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
