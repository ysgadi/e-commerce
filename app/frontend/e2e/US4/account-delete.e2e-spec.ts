import {browser, ExpectedConditions} from 'protractor';
import { AccountDeletePage } from './account-delete.po';
import { RegisterPage } from './../US0/register.po';

describe('account delete page', () => {
  let page: AccountDeletePage;

  beforeEach(() => {
    page = new AccountDeletePage();
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

  it(`should have a Account Details fields with delete account button`, () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('Delete My account');
    expect(page.getEmail().isPresent()).toBe(true);
    expect(page.getPseudo().isPresent()).toBe(true);
    expect(page.getDeleteButton().isPresent()).toBe(true);
    expect(page.getModalButtonYes().isPresent()).toBe(false);
    expect(page.getModalButtonNo().isPresent()).toBe(false);
    expect(page.getErrorDiv().isPresent()).toBe(false);
  });

  it(`should open a window modal with two buttons (yes,no) when the user clicks on the button delete account`, () => {
    page.navigateTo();
    page.getDeleteButton().click();
    expect(page.getModalButtonYes().isPresent()).toBe(true);
    expect(page.getModalButtonNo().isPresent()).toBe(true);
  });

  it(`should close window modal,logout and redirected to /home when the user clicks on the button Yes`, () => {
    page.logout();

    // create user
    const pageRegister = new RegisterPage();
    pageRegister.navigateTo();
    pageRegister.getEmailInput().sendKeys('user-to-delete@purpose.fr');
    pageRegister.getPasswordInput().sendKeys('myPass');
    pageRegister.getPasswordConfirmInput().sendKeys('myPass');
    pageRegister.getPseudoInput().sendKeys('user-to-delete');
    pageRegister.getAddressInput().sendKeys('somewhere');
    pageRegister.getIBANInput().sendKeys('FR0000000000000000000000000');
    pageRegister.getSubmitInput().click();
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);

    // login with this user
    page.loginWithOther('user-to-delete@purpose.fr', 'myPass');
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);

    // delete
    page.navigateTo();
    page.getDeleteButton().click();
    page.getModalButtonYes().click();
    expect(page.getModalButtonYes().isPresent()).toBe(false);
    expect(page.getModalButtonNo().isPresent()).toBe(false);
    expect(page.getErrorDiv().isPresent()).toBe(false);
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);
  });
});

