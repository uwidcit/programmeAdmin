import {element, by} from 'protractor';


export class HomePage {

  // Getting DOM Elements
  getMatCards() { return element(by.css('mat-card')); }
  getFacultyTable() { return element(by.css('table')); }
  getViewProgrammesButton() { return element(by.css('#viewProgrammes')); }
}
