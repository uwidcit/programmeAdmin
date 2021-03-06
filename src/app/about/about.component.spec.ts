import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatRadioModule
      ],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
