import { browser, by, element } from 'protractor';

export class LoginPage {

  // Navigation
  navigateTo() { return browser.get('/'); }

  // Getting DOM Elements
  getPageTitle() { return browser.getTitle(); }
  getHeaderText() { return element(by.css('#globTitle')).getText(); }
  getForm() { return element(by.css('form')); }
  getImage() { return element(by.css('img')); }
  getSubmitButton() { return element(by.css('#submitBtn')); }
  getClearButton() { return element(by.css('#submitBtn + button')); }
}
