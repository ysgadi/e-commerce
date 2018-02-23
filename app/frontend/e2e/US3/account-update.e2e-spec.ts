import {browser, ExpectedConditions} from 'protractor';
import { AccountUpdatePage } from './account-update.po';

describe('account update page', () => {
  let page: AccountUpdatePage;
  const userEmail = 'admin@pgweb-13.fr';
  const userAddress = '33400, Talence';

  beforeEach(() => {
    page = new AccountUpdatePage();
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

  it(`should have a Account Update form`, () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('Account update');
    expect(page.getEmailInput().isPresent()).toBe(true);
    expect(page.getPseudoInput().isPresent()).toBe(true);
    expect(page.getFirstNameInput().isPresent()).toBe(true);
    expect(page.getLastNameInput().isPresent()).toBe(true);
    expect(page.getAddressInput().isPresent()).toBe(true);
    expect(page.getIBANInput().isPresent()).toBe(true);
    expect(page.getSubmitInput().isPresent()).toBe(true);
    expect(page.getErrorDiv().isPresent()).toBe(false);
  });

  it(`should have existing user`, () => {
    page.navigateTo();
    expect(page.getEmailInput().getAttribute('value')).toEqual(userEmail);
    expect(page.getPseudoInput().getAttribute('value')).toEqual('john-e-commerce');
    expect(page.getFirstNameInput().getAttribute('value')).toEqual('john');
    expect(page.getLastNameInput().getAttribute('value')).toEqual('doe');
    expect(page.getAddressInput().getAttribute('value')).toEqual(userAddress);
    expect(page.getIBANInput().getAttribute('value')).toEqual('FR7610011000201234567890188');

  });

  it('should throw an error message when email exists', function () {
    updateAccount(true);
  });

  it('should be able to update account with new address 33170, Gradignan', function () {
    updateAccount(false);
  });

  function updateAccount(withEmail: boolean) {
    page.navigateTo();
    if (withEmail) {
      page.getEmailInput()
        .clear()
        .then(() => page.getEmailInput().sendKeys('lambda@pgweb-13.fr'));
    }
    page.getAddressInput()
      .clear()
      .then(() => page.getAddressInput().sendKeys('33170, Gradignan'));
    page.getSubmitInput().click();

    expect(page.getErrorDiv().isPresent()).toBe(withEmail);
    if (!withEmail) {
      browser.wait(ExpectedConditions.urlContains('/account/details'), 5000);
    }

    // check if the account is updated
    page.navigateTo();
    if (withEmail) {
      expect(page.getEmailInput().getAttribute('value')).toEqual(userEmail);
      expect(page.getAddressInput().getAttribute('value')).toEqual(userAddress);
    } else {
      expect(page.getAddressInput().getAttribute('value')).toEqual('33170, Gradignan');
    }

    // reset the modifications
    page.getEmailInput()
      .clear()
      .then(() => page.getEmailInput().sendKeys(userEmail));
    page.getAddressInput()
      .clear()
      .then(() => page.getAddressInput().sendKeys(userAddress));
    page.getSubmitInput().click();
    expect(page.getErrorDiv().isPresent()).toBe(false);
    browser.wait(ExpectedConditions.urlContains('/account/details'), 5000);
  }
});
