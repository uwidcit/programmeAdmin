import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../auth.service';
import { MatSnackBar } from '@angular/material';
import {FormGroup} from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * This component is responsible for authenticating users at different levels.
 * Currently, there are two levels: top-level administrator and faculty-level
 * administrator. The view and permissions will change based on who is currently
 * logged in.
 * */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    pword: new FormControl('', [
      Validators.required,
      Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'))
    ])
  });
  /**
   * Input control to help with validating input
   * */
  /**
   * Password control. A password must contain at least: 8 characters,
   * 1 uppercase letter, 1 lowercase letter, and 1 number.
   * */
  /**
   * Takes in the form controls defined in this component to determine whether or not
   * input data is valid
   * */
  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  /**
   * Logs in a user
   * */
  login() {
      const email = this.form.controls['email'].value;
      const pword = this.form.controls['pword'].value;
      this.authService.emailLogin(email, pword).catch(() => {
        this.snackBar.open('Invalid Credentials :(', 'Close', { duration : 2000});
      });
  }
}

