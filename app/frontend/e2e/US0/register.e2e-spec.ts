import {browser, ExpectedConditions} from 'protractor';
import {RegisterPage} from './register.po';
import {AccountDeletePage} from './../US4/account-delete.po';

describe('register page', () => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
  });

  it(`should have a register form`, () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('Register');
    expect(page.getEmailInput().isPresent()).toBe(true);
    expect(page.getPasswordInput().isPresent()).toBe(true);
    expect(page.getPasswordConfirmInput().isPresent()).toBe(true);
    expect(page.getPseudoInput().isPresent()).toBe(true);
    expect(page.getFirstNameInput().isPresent()).toBe(true);
    expect(page.getLastNameInput().isPresent()).toBe(true);
    expect(page.getAddressInput().isPresent()).toBe(true);
    expect(page.getIBANInput().isPresent()).toBe(true);
    expect(page.getSubmitInput().isPresent()).toBe(true);
    expect(page.getErrorDiv().isPresent()).toBe(false);
  });

  it('should throw an error message when password != passwordConfirm', function () {
    page.navigateTo();
    page.getEmailInput().sendKeys('for-testing@purpose.fr');
    page.getPasswordInput().sendKeys('for-testing');
    page.getPasswordConfirmInput().sendKeys('for-testingg');
    page.getPseudoInput().sendKeys('john-e-commerce');
    page.getFirstNameInput().sendKeys('john');
    page.getLastNameInput().sendKeys('doe');
    page.getAddressInput().sendKeys('33400, Talence');
    page.getIBANInput().sendKeys('FR7610011000201234567890188');
    page.getSubmitInput().click();
    expect(page.getErrorDiv().isPresent()).toBe(true);
  });

  it('should be able to register with email for-testing@purpose.fr / for-testing', function () {
    page.navigateTo();
    page.getEmailInput().sendKeys('for-testing@purpose.fr');
    page.getPasswordInput().sendKeys('for-testing');
    page.getPasswordConfirmInput().sendKeys('for-testing');
    page.getPseudoInput().sendKeys('john-e-commerce');
    page.getFirstNameInput().sendKeys('john');
    page.getLastNameInput().sendKeys('doe');
    page.getAddressInput().sendKeys('33400, Talence');
    page.getIBANInput().sendKeys('FR7610011000201234567890188');
    page.getSubmitInput().click();
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);

    // login
    const pageDelete = new AccountDeletePage();
    pageDelete.loginWithOther('for-testing@purpose.fr', 'for-testing');
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);

    // delete account
    pageDelete.navigateTo();
    pageDelete.getDeleteButton().click();
    pageDelete.getModalButtonYes().click();
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);
  });

  it('should NOT be able to register with admin@pgweb-13.fr / admin. already exists', function () {
    page.navigateTo();
    page.getEmailInput().sendKeys('admin@pgweb-13.fr');
    page.getPasswordInput().sendKeys('admin');
    page.getPasswordConfirmInput().sendKeys('admin');
    page.getPseudoInput().sendKeys('john-e-commerce');
    page.getFirstNameInput().sendKeys('john');
    page.getLastNameInput().sendKeys('doe');
    page.getAddressInput().sendKeys('33400, Talence');
    page.getIBANInput().sendKeys('FR7610011000201234567890188');
    page.getSubmitInput().click();

    expect(page.getErrorDiv().isPresent()).toBe(true);
  });

});
