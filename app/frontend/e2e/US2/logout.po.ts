import {browser, by, element} from 'protractor';
import {AuthHelper} from '../auth-helper';

export class LogOutPage extends AuthHelper {
  navigateTo() {
    return browser.get('/home');
  }

  getLogOutButton() {
    return element(by.css('button#logout'));
  }


}
