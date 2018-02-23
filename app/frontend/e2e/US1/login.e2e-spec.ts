import {browser, ExpectedConditions} from 'protractor';
import {LoginPage} from './login.po';
import {AuthHelper} from '../auth-helper';

describe('login page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  afterEach(() => {
    AuthHelper.clearStorage();
  });

  it(`should have a login form`, () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('Login');
    expect(page.getEmailInput().isPresent()).toBe(true);
    expect(page.getPasswordInput().isPresent()).toBe(true);
    expect(page.getErrorDiv().isPresent()).toBe(false);
  });

  it('should be able to login with admin@pgweb-13.fr / admin.', function () {
    page.navigateTo();
    page.getEmailInput().sendKeys('admin@pgweb-13.fr');
    page.getPasswordInput().sendKeys('admin');
    page.getSubmitInput().click();
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);
  });

  it('should NOT be able to login with email notexists@ecommerce.fr / notexists', function () {
    page.navigateTo();
    page.getEmailInput().sendKeys('notexists@commerce.fr');
    page.getPasswordInput().sendKeys('notexists');
    page.getSubmitInput().click();
    expect(page.getErrorDiv().isPresent()).toBe(true);
  });

});
