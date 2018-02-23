import {browser, ExpectedConditions} from 'protractor';
import {LoginPage} from './US1/login.po';

export abstract class AuthHelper {
  loginPage: LoginPage = new LoginPage();

  public static clearStorage() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  }

  logout(): void {
    AuthHelper.clearStorage();
  }

  loginWithRoot(): void {
    this.loginPage.navigateTo();
    this.loginPage.getEmailInput().sendKeys('admin@pgweb-13.fr');
    this.loginPage.getPasswordInput().sendKeys('admin');
    this.loginPage.getSubmitInput().click();
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);
  }

  loginWithOther(email: string, password: string): void {
    this.loginPage.navigateTo();
    this.loginPage.getEmailInput().sendKeys(email);
    this.loginPage.getPasswordInput().sendKeys(password);
    this.loginPage.getSubmitInput().click();
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);
  }
}
