import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { LoginComponent } from './login.component';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBar} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {Overlay} from '@angular/cdk/overlay';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let emailControl;
  let pwordControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports : [
        BrowserAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
        MatSnackBar,
        Overlay
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    emailControl = component.form.controls['email'];
    pwordControl = component.form.controls['pword'];
    fixture.detectChanges();
  });

  afterEach(() => {
    emailControl = null;
    pwordControl = null;
  });

  it('Login Component should be created', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });

  it('should check if a FormGroup Object exists', () => {
    expect(component.form).toBeTruthy();
  });

  it('should test if email and password fields are invalid on start up', () => {
    expect(emailControl.valid).toBeFalsy();
    expect(pwordControl.valid).toBeFalsy();
  });
  //
  it ('should test email field for required and matching pattern', () => {
    expect(emailControl.valid).toBeFalsy();

    let emailErrors = {};
    emailErrors = emailControl.errors || {};
    expect(emailErrors['required']).toBeTruthy();

    emailControl.setValue('test');
    emailErrors = emailControl.errors || {};
    expect(emailErrors['email']).toBeTruthy();
  });
  //
  it('should test password field for required and matching pattern', () => {
    expect(pwordControl.valid).toBeFalsy();
    let pwordErrors = {};
    pwordErrors = pwordControl.errors || {};
    expect(pwordErrors['required']).toBeTruthy();

    pwordControl.setValue('somepassword');
    pwordErrors = pwordControl.errors || {};
    expect(pwordErrors['pattern']).toBeTruthy();
  });
  //
  it('should test various email and password inputs', () => {
    expect(emailControl.valid).toBeFalsy();
    expect(pwordControl.valid).toBeFalsy();

    emailControl.setValue('someone@example.com');
    pwordControl.setValue('Something123');
    expect(component.form.valid).toBeTruthy();

    emailControl.setValue('someone.else@example.com');
    pwordControl.setValue('Some123thing');
    expect(component.form.valid).toBeTruthy();

    emailControl.setValue('someone@example.server.com');
    pwordControl.setValue('somethinG123');
    expect(component.form.valid).toBeTruthy();

    emailControl.setValue('someone.else@example.server.com');
    pwordControl.setValue('Sifnfow12943');
    expect(component.form.valid).toBeTruthy();
  });
});
