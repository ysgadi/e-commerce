import {browser, by, element, ElementFinder} from 'protractor';

export class ArticlesListPage {
  navigateTo() {
    return browser.get('/home');
  }

  getHeader() {
    return element.all(by.css('h3')).first().getText();
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

  getCreateButton() {
    return element(by.css('#create-btn'));
  }
  getSearchButton() {
    return element(by.css('#create-btn'));
  }
}

