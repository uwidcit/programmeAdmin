import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsComponent } from './errors.component';
import {MatSpinner, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Mockdata} from '../mock/mock-data';
import {By} from '@angular/platform-browser';

describe('ErrorsComponent', () => {
  let component: ErrorsComponent;
  let fixture: ComponentFixture<ErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ErrorsComponent,
        MatSpinner
      ],
      imports: [
        MatDialogModule
      ],
      providers: [HttpClient, HttpHandler,
        { provide: MAT_DIALOG_DATA, useValue: {}},
        { provide: MatDialogRef, useValue: ErrorsComponent }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be waiting for a request on initialization', () => {
    expect(component.pendingRequest).toBe(true);
  });

  it('should test if the UI reacts appropriately when data becomes available', () => {
    component.errors = Mockdata.errors.good;
    component.pendingRequest = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('mat-spinner'))).toBe(null);
    expect(fixture.debugElement.query(By.css('table'))).not.toBe(null);
    expect(fixture.debugElement.query(By.css('#headerRow'))).not.toBe(null);
    expect(fixture.debugElement.query(By.css('#headerRow')).children.length).toBe(6);
    expect(fixture.debugElement.query(By.css('button'))).not.toBe(null);
  });

});
