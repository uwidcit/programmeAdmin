import {browser, by, element, ElementFinder, protractor} from 'protractor';

export class LoginPage {

  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return browser.getTitle();
  }

  getHeaderText() {
    return element(by.css('#globTitle')).getText();
  }

  getForm() {
    return element(by.css('form'));
  }

  getImage() {
    return element(by.css('img'));
  }

  getSubmitButton() {
    return element(by.css('#submitBtn'));
  }

  getClearButton() {
    return element(by.css('#submitBtn + button'));
  }

}
