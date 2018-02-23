import {browser, by, element, ElementFinder} from 'protractor';
import {AuthHelper} from '../auth-helper';

export class CartListPage extends AuthHelper {
  navigateTo() {
    return browser.get('/cart');
  }

  getHeader() {
    return element(by.css('h3')).getText();
  }

  getArticlesTable() {
    return element(by.css('table'));
  }

  getArticlesTableHeaders() {
    return this.getArticlesTable().all(by.css('thead tr th'));
  }

  getArticlesTableEntries() {
    return this.getArticlesTable().all(by.css('tbody tr'));
  }

  getViewLink(entryElement: ElementFinder) {
    return entryElement.element(by.css('.view-article'));
  }
}
