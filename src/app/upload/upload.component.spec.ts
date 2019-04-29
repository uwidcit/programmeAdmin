import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadComponent ],
      imports: [MatDialogModule, AngularFileUploaderModule],
      providers: [HttpClient, HttpHandler, {provide: MAT_DIALOG_DATA, useValue: '23141'},  {provide: MatDialogRef, useValue: UploadComponent},]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
