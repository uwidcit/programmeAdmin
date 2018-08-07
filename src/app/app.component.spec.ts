import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { DemoMaterialModule} from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import {SpinnerComponent} from './shared/spinner.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {ViewComponent} from './view/view.component';
import {SubjectsComponent} from './subjects/subjects.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FullComponent,
        AppHeaderComponent,
        AppSidebarComponent,
        ViewComponent,
        SpinnerComponent,
        AboutComponent,
        LoginComponent,
        SubjectsComponent
      ],
      imports: [
        BrowserModule,
        DemoMaterialModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterModule.forRoot(AppRoutes)
      ],
      providers: [
        {
          provide: LocationStrategy,
          useClass: HashLocationStrategy
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});


