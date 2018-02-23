import {browser, by, element} from 'protractor';
import {AuthHelper} from '../auth-helper';

export class AccountDeletePage extends AuthHelper {
  navigateTo() {
    return browser.get('/account/delete');
  }

  getHeader() {
    return element(by.css('h5')).getText();
  }

  getEmail() {
    return element(by.css('div.card #email'));
  }

  getPseudo() {
    return element(by.css('div.card #pseudo'));
  }

  getErrorDiv() {
    return element(by.css('div#messageDiv.alert-danger'));
  }

  getDeleteButton() {
    return element(by.css('.btn#deleteAccount'));
  }

  getModalButtonYes() {
    return element(by.css('.btn#yes'));
  }

  getModalButtonNo() {
    return element(by.css('.btn#no'));
  }
}
