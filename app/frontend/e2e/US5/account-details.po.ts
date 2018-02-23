import {browser, by, element} from 'protractor';
import {AuthHelper} from '../auth-helper';

export class AccountDetailsPage extends AuthHelper {
  navigateTo() {
    return browser.get('/account/details');
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

  getName() {
    return element(by.css('div.card #name'));
  }

  getAddress() {
    return element(by.css('div.card #address'));
  }

  getIBAN() {
    return element(by.css('div.card #IBAN'));
  }
}
