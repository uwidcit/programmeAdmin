import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {environment} from 'environments/environment';

export interface Admin {
  uid: string;
  faculty: string;
  color: string;
  write: boolean;
}

/**
 * This services uses Firebase Authentication to determine whether or not a person has logged in to the application.
 * Additionally, it uses extra information stored in the Firebase Realtime Database to determine who exactly is logged
 * in. This will in turn determine how the view will look as well as read/write permissions on the page itself.
 * */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Initialization of Firebase Auth functions
   * */
  auth = firebase.auth();

  /**
   * Initialization of Firebase Realtime Database functions
   * */
  db = firebase.database();

  /**
   * Determines whether or not a person is logged in
   * */
  loggedIn: boolean;

  /**
   * The container holding the information about the current user. This information is fetched by the database and is undefined
   * on starting the application, meaning that no person has logged in.
   * */
  sys_admin = new BehaviorSubject<Admin>(undefined);

  /**
   * An RxJS Observable to listen when data changes. An event will be fired only when data comes in from the database, meaning that only
   * when a person logs in, then this Observable will fire an event.
   * */
  data_incoming = this.sys_admin.asObservable();

  /**
   * The application is immediately checked when the person has logged in or not. If the person has logged in previously, then they will
   * be taken to the home page. If not, then are redirected to the login page
   * */
  constructor(private router: Router) {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User recognized. Login successful.');
        this.db.ref('/users/' + user.uid).once('value', (snapshot) => {
          const data = snapshot.val();
          this.sys_admin.next({
            uid: user.uid,
            faculty: data.faculty_name,
            color: environment.facColour[data.faculty_name],
            write: data.write
          });
        });
        this.loggedIn = true;
        this.router.navigate(['/home']);
      } else {
        console.log('Not logged in for some reason');
        this.loggedIn = false;
      }
    });
  }

  /**
   * Built in Firebase email login
   * */
  emailLogin(email, pword) {
    return this.auth.signInWithEmailAndPassword(email, pword);
  }

  /**
   * Built in Firebase auth sign out method
   * */
  signout() {
    this.auth.signOut().then(function () {
      console.log('Sign out successful...');
    }).catch(function (error) {
      console.log(error);
      console.log('Error signing out user...');
    });
  }
}
