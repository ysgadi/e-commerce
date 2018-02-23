import {browser, by, element} from 'protractor';
import {AuthHelper} from '../auth-helper';

export class CartAddPage extends AuthHelper {
  navigateTo() {
    return browser.get('/article/1');
  }

  getQuantityInput() {
    return element(by.css('form.user-actions input[name=quantity][type=number]'));
  }

  getAddToCartButton() {
    return element(by.css('form.user-actions button[type=submit]'));
  }
}
