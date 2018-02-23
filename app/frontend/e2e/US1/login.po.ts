import {browser, by, element} from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  getHeader() {
    return element(by.css('h5')).getText();
  }

  getEmailInput() {
    return element(by.css('form#login-form input[name=email][type=email]'));
  }

  getPasswordInput() {
    return element(by.css('form#login-form input[name=password][type=password]'));
  }

  getSubmitInput() {
    return element(by.css('form#login-form input[type=submit]'));
  }

  getErrorDiv() {
    return element(by.css('div#errMessageDiv.alert-danger'));
  }
}
