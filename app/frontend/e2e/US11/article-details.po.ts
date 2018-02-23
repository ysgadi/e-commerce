import {browser, by, element} from 'protractor';
import {AuthHelper} from '../auth-helper';

export class ArticleDetailsPage extends AuthHelper {
  navigateTo() {
    return browser.get('/article/1');
  }

  getName() {
    return element(by.css('div.card #name'));
  }

  getDescription() {
    return element(by.css('div.card #description'));
  }

  getPrice() {
    return element(by.css('div.card #price'));
  }

  getCategory() {
    return element(by.css('div.card #category'));
  }

  getQuantity() {
    return element(by.css('div.card #quantity'));
  }

  getOwnerButton() {
    return element(by.css('#owner-btn'));
  }

  getUpdateButton() {
    return element(by.css('#update-btn'));
  }

  getErrorDiv() {
    return element(by.css('div#messageDiv.alert-danger'));
  }
}
