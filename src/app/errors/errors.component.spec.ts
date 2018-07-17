import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsComponent } from './errors.component';
import {MatSpinner, MatDialogModule} from '@angular/material';
import {HttpClient, HttpHandler} from '@angular/common/http';

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
      providers: [HttpClient, HttpHandler]
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
});
