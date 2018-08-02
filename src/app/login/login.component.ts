import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  faculties = Object.keys(environment.faculties);
  // form: FormGroup;
  classes: any[];
  pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
  // fnameControl = new FormControl('', [Validators.required]);
  // lnameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  pwordControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.pattern)
  ]);
  // newPwordControl = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern(this.pattern)
  // ]);
  matcher = new MyErrorStateMatcher();
  pword: string;
  admin_view: boolean;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {

  }

  login() {
      const email = this.emailControl.value;
      const pword = this.pwordControl.value;
      this.authService.emailLogin(email, pword).then(user => {
        this.admin_view = (user !== undefined);
      }).catch(() => {
        this.snackBar.open('Invalid Credentials :(', 'Close', { duration : 1000});
      });
  }

  clearFields() {
    this.emailControl.setValue('');
    this.pwordControl.setValue('');
  }

  // newUserFields() {
  //   this.newUser = true;
  //   this.classes = ['content'];
  // }

  // removeUserFields() {
  //   this.newUser = false;
  //   this.classes = [];
  // }

  // createNewUser() {
  //   const localAuth = this.authService;
  //   const newUser: Admin = {
  //     fname: (document.getElementById('fname') as HTMLInputElement).value,
  //     lname: (document.getElementById('lname') as HTMLInputElement).value,
  //     email: (document.getElementById('email') as HTMLInputElement).value,
  //     faculty: this.selectedFaculty,
  //     write: true,
  //     uid: ''
  //   };
  //   this.pword = (document.getElementById('pword') as HTMLInputElement).value;
  //   // create new User and get ID
  //   // @ts-ignore
  //   firebase
  //     .auth().createUserWithEmailAndPassword(newUser.email, this.pword)
  //     .then(() => {
  //       localAuth.emailLogin(newUser.email, this.pword).then((userData) => {
  //         // write data to database
  //         console.log(newUser.faculty);
  //         newUser.uid = userData.user.uid;
  //         localAuth.addUserToDB(newUser);
  //       });
  //     })
  //     .catch(error => {
  //       if (error.code === 'auth/email-already-in-use') { console.log('Email is already in use...'); }
  //       if (error.code === 'auth/weak-password') { console.log('Password too weak. Choose a stronger password'); }
  //     });
  // }

  // submit() {
  //   if (this.newUser) { this.createNewUser(); }
  //   else { this.login(); }
  // }
}

