import {browser, by, element, ElementFinder} from 'protractor';
import {ArticleDetailsPage} from './../US11/article-details.po';

export class ArticleDeletePage extends ArticleDetailsPage {
  getDeleteButton() {
    return element(by.css('#delete-btn'));
  }
}
