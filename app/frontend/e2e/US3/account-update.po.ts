import {browser, by, element} from 'protractor';
import {AuthHelper} from '../auth-helper';

export class AccountUpdatePage extends AuthHelper {
  navigateTo() {
    return browser.get('/account/update');
  }

  getHeader() {
    return element(by.css('h5')).getText();
  }

  getEmailInput() {
    return element(by.css('form#update-account-form input[name=email][type=email]'));
  }

  getPseudoInput() {
    return element(by.css('form#update-account-form input[name=pseudo]'));
  }

  getFirstNameInput() {
    return element(by.css('form#update-account-form input[name=firstname]'));
  }

  getLastNameInput() {
    return element(by.css('form#update-account-form input[name=lastname]'));
  }

  getAddressInput() {
    return element(by.css('form#update-account-form input[name=address]'));
  }

  getIBANInput() {
    return element(by.css('form#update-account-form input[name=IBAN]'));
  }

  getSubmitInput() {
    return element(by.css('form#update-account-form input[type=submit]'));
  }

  getErrorDiv() {
    return element(by.css('div#messageDiv.alert-danger'));
  }

  getSuccessDiv() {
    return element(by.css('div#messageDiv.alert-success'));
  }
}
