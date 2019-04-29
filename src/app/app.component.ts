import {  Component} from '@angular/core';
import {environment} from '../environments/environment';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'app';
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.config);
    }
  }

}
