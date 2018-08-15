import {browser, element, by, ElementFinder} from 'protractor';
import {LoginPage} from './login.po';

describe('material App', () => {
  browser.ignoreSynchronization = true;
  const page: LoginPage = new LoginPage();

  it('should re-route to login page and test DOM', async () => {
    browser.waitForAngularEnabled();
    page.navigateTo().then(() => { console.log('Navigation completed'); });
    const currURL = await browser.getCurrentUrl();
    expect(currURL).toContain('login');
    expect(page.getPageTitle()).toBe('Programme Admin Dashboard');
    expect(page.getHeaderText()).toBe('Programme Admin Dashboard');
    expect(page.getForm().isPresent()).toBeTruthy();
    expect(page.getImage().isPresent()).toBeTruthy();
    expect(page.getSubmitButton().isPresent()).toBeTruthy();
    expect(page.getClearButton().isPresent()).toBeTruthy();
    expect(element(by.css('li')).isPresent()).toBeFalsy(); // dummy test
  });
});
