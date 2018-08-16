import {browser, element, by, ElementFinder} from 'protractor';
import {LoginPage} from './login.po';
import {HomePage} from './home.po';

describe('UWI Programme Admin Dashboard', () => {
  browser.ignoreSynchronization = true;
  const loginPage: LoginPage = new LoginPage();
  const homePage: HomePage = new HomePage();

  it('should re-route to login page and test DOM', async () => {
    browser.waitForAngularEnabled();
    loginPage.navigateTo().then(() => { console.log('Navigation completed'); });
    const currURL = await browser.getCurrentUrl();
    expect(currURL).toContain('login');
    expect(loginPage.getPageTitle()).toBe('Programme Admin Dashboard');
    expect(loginPage.getHeaderText()).toBe('Programme Admin Dashboard');
    expect(loginPage.getForm().isPresent()).toBeTruthy();
    expect(loginPage.getImage().isPresent()).toBeTruthy();
    expect(loginPage.getSubmitButton().isPresent()).toBeTruthy();
    expect(loginPage.getClearButton().isPresent()).toBeTruthy();
    expect(element(by.css('li')).isPresent()).toBeFalsy(); // dummy test
  });

  it('should guard routes when unauthorized', async () => {
    browser.get('http://localhost:4200/#/view');
    let currURL = await browser.getCurrentUrl();
    expect(currURL).toBe('http://localhost:4200/#/login');
    browser.get('http://localhost:4200/#/home');
    currURL = await browser.getCurrentUrl();
    expect(currURL).toBe('http://localhost:4200/#/login');
    browser.get('http://localhost:4200/#/about');
    currURL = await browser.getCurrentUrl();
    expect(currURL).toBe('http://localhost:4200/#/login');
    browser.get('http://localhost:4200/#/subjects');
    currURL = await browser.getCurrentUrl();
    expect(currURL).toBe('http://localhost:4200/#/login');
  });

  it('should redirect to login when unknown url is entered', async () => {
    browser.get('http://localhost:4200/#/api');
    let currURL = await browser.getCurrentUrl();
    expect(currURL).toBe('http://localhost:4200/#/login');
    browser.get('http://localhost:4200/#/uwi');
    currURL = await browser.getCurrentUrl();
    expect(currURL).toBe('http://localhost:4200/#/login');
    browser.get('http://localhost:4200/#/test');
    currURL = await browser.getCurrentUrl();
    expect(currURL).toBe('http://localhost:4200/#/login');
  });

  it('should redirect to the home loginPage when the user successfully logs in', () => {
    browser.driver.findElement(by.css('#email')).sendKeys('master.programme.admin@sta.uwi.edu');
    browser.driver.findElement(by.css('#pword')).sendKeys('ProgrammeController1029');
    element(by.css('#submitBtn')).click();
    setTimeout(() => {
      expect(browser.getCurrentUrl()).toBe('http://localhost:4200/#/home');
    }, 1500);
  });
});
