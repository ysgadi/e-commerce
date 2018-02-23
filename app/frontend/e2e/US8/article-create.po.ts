import {browser, by, element} from 'protractor';
import {AuthHelper} from '../auth-helper';

export class ArticleCreatePage extends AuthHelper {
  navigateTo() {
    return browser.get('/article/create');
  }

  getHeader() {
    return element(by.css('h5')).getText();
  }

  getNameInput() {
    return element(by.css('form#article-form input[name=name][type=text]'));
  }

  getDescriptionInput() {
    return element(by.css('form#article-form input[name=description][type=text]'));
  }

  getPriceInput() {
    return element(by.css('form#article-form input[name=price][type=number]'));
  }

  getCategorySelect() {
    return element(by.css('form#article-form select[name=category]'));
  }

  selectCategoryField(option) {
    element(by.cssContainingText('option', option)).click();
  }

  getQuantityInput() {
    return element(by.css('form#article-form input[name=quantity][type=number]'));
  }

  getSubmitInput() {
    return element(by.css('form#article-form input[type=submit]'));
  }

  getErrorDiv() {
    return element(by.css('div#messageDiv.alert-danger'));
  }

  getSuccessDiv() {
    return element(by.css('div#messageDiv.alert-success'));
  }
}
