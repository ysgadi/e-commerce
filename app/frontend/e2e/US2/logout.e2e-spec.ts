import {browser, ExpectedConditions} from 'protractor';
import { LogOutPage } from './logout.po';

describe('logout page', () => {
  let page: LogOutPage;
  const userEmail = 'admin@pgweb-13.fr';

  beforeEach(() => {
    page = new LogOutPage();
    page.loginWithRoot();
  });

  afterEach(() => {
    page.logout();
  });

  it('should NOT be able to log out when not being logged in', () => {
    page.logout();
    page.navigateTo();
    expect(page.getLogOutButton().isPresent()).toBe(false);
  });

  it('should be able to see the log out button when logged in', () => {
    page.navigateTo();
    expect(page.getLogOutButton().isPresent()).toBe(true);
  });

  it('should be able to log out when being logged in', () => {
    page.navigateTo();
    page.getLogOutButton().click();
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);
    expect(page.getLogOutButton().isPresent()).toBe(false);
  });

});
