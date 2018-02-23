import {browser, by, element} from 'protractor';

export class RegisterPage {
  navigateTo() {
    return browser.get('/register');
  }

  getHeader() {
    return element(by.css('h5')).getText();
  }

  getEmailInput() {
    return element(by.css('form#register-form input[name=email][type=email]'));
  }

  getPasswordInput() {
    return element(by.css('form#register-form input[name=password][type=password]'));
  }

  getPasswordConfirmInput() {
    return element(by.css('form#register-form input[name=passwordConfirm][type=password]'));
  }

  getPseudoInput() {
    return element(by.css('form#register-form input[name=pseudo]'));
  }

  getFirstNameInput() {
    return element(by.css('form#register-form input[name=firstname]'));
  }

  getLastNameInput() {
    return element(by.css('form#register-form input[name=lastname]'));
  }

  getAddressInput() {
    return element(by.css('form#register-form input[name=address]'));
  }

  getIBANInput() {
    return element(by.css('form#register-form input[name=IBAN]'));
  }

  getSubmitInput() {
    return element(by.css('form#register-form input[type=submit]'));
  }

  getErrorDiv() {
    return element(by.css('div#messageDiv.alert-danger'));
  }

  getSuccessDiv() {
    return element(by.css('div#messageDiv.alert-success'));
  }
}
