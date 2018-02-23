import {browser, by, element, ElementFinder} from 'protractor';
import {CartListPage} from '../US12/cart-list.po';

export class CartRemovePage extends CartListPage {
  getRemoveButton(entryElement: ElementFinder) {
    return entryElement.element(by.css('.remove-btn'));
  }
}
