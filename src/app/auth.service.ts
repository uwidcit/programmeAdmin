import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export interface Admin {
  uid: string;
  email: string;
  faculty: string;
  write: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = firebase.auth();
  db = firebase.database();
  loggedIn: boolean;
  sys_admin = new BehaviorSubject<Admin>(undefined);
  data_incoming = this.sys_admin.asObservable();

  constructor() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User recognized. Login successful.');
        this.db.ref('/users/' + user.uid).once('value', (snapshot) => {
          const data = snapshot.val();
          this.sys_admin.next({
            uid: user.uid,
            email: data.email,
            faculty: data.faculty_name,
            write: data.write
          });
        });
        this.loggedIn = true;
      } else {
        console.log('Not logged in for some reason');
        this.loggedIn = false;
      }
    });
  }

  emailLogin(email, pword) {
    return this.auth.signInWithEmailAndPassword(email, pword);
  }

  signout() {
    // const routerInst = this.router;
    this.auth.signOut().then(function () {
      console.log('Sign out successful...');
    }).catch(function (error) {
      console.log(error);
      console.log('Error signing out user...');
    });
  }


  // createUser(email, pword) {
  //   // @ts-ignore
  //   this.auth.createUserWithEmailAndPassword(email, pword)
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }

  // addUserToDB(user: Admin) {
  //   this.loggedIn = true;
  //   // console.log(user.faculty);
  //   const ref = this.db.ref('/').child('users').child(user.uid);
  //   ref.set(user, (error) => {
  //       if (error) { console.log(error); }
  //       else { console.log('write of user ' + user.uid + ' was successful.'); }
  //     });
  // }
}




