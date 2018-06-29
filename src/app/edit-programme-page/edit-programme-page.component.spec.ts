import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgrammePageComponent } from './edit-programme-page.component';
import {
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatToolbarModule,
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

describe('EditProgrammePageComponent', () => {
  let component: EditProgrammePageComponent;
  let fixture: ComponentFixture<EditProgrammePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatListModule,
        MatCheckboxModule,
        MatChipsModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      declarations: [ EditProgrammePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgrammePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
