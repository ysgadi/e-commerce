import {browser, by, element} from 'protractor';

export class UserDetailsPage {
  navigateTo() {
    return browser.get('/user/1');
  }

  getHeader() {
    return element(by.css('h5')).getText();
  }

  getPseudo() {
    return element(by.css('div.card #pseudo'));
  }

  getName() {
    return element(by.css('div.card #name'));
  }

  getIBAN() {
    return element(by.css('div.card #IBAN'));
  }
}
