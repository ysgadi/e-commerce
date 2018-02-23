import {browser, ExpectedConditions} from 'protractor';
import { AccountDetailsPage } from './account-details.po';

describe('account details page', () => {
  let page: AccountDetailsPage;

  beforeEach(() => {
    page = new AccountDetailsPage();
    page.loginWithRoot();
  });

  afterEach(() => {
    page.logout();
  });

  it('should be redirected to /login for non authenticated user', () => {
    page.logout();
    page.navigateTo();
    browser.wait(ExpectedConditions.urlContains('/login'), 5000);
  });

  it(`should have a Account Details fields`, () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('My account');
    expect(page.getEmail().isPresent()).toBe(true);
    expect(page.getPseudo().isPresent()).toBe(true);
    expect(page.getName().isPresent()).toBe(true);
    expect(page.getAddress().isPresent()).toBe(true);
    expect(page.getIBAN().isPresent()).toBe(true);
  });

  it(`should have existing user`, () => {
    page.navigateTo();
    expect(page.getEmail().getText()).toContain('admin@pgweb-13.fr');
    expect(page.getPseudo().getText()).toEqual('john-e-commerce');
    expect(page.getName().getText()).toEqual('john doe');
    expect(page.getAddress().getText()).toContain('33400, Talence');
    expect(page.getIBAN().getText()).toContain('FR7610011000201234567890188');
  });
});
