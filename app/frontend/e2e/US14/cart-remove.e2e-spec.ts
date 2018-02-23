import {browser, by, ExpectedConditions} from 'protractor';
import { CartRemovePage } from './cart-remove.po';
import { CartAddPage } from './../US13/cart-add.po';

describe('cart remove article page', () => {
  it(`should not have article once remove from cart`, () => {
    const page = new CartRemovePage();
    const pageAdd = new CartAddPage();
    page.loginWithRoot();

    pageAdd.navigateTo();
    pageAdd.getQuantityInput().clear()
      .then(() => pageAdd.getQuantityInput().sendKeys(2));
    pageAdd.getAddToCartButton().click();

    browser.wait(ExpectedConditions.urlContains('/cart'), 5000);

    const row = page.getArticlesTableEntries().first();
    const cols = row.all(by.tagName('td'));
    expect(cols.get(0).getText()).toEqual('Computer PgWeb');
    const removeBtn = page.getRemoveButton(cols.get(3));
    expect(removeBtn.isPresent()).toBe(true);
    expect(removeBtn.getAttribute('href')).toEqual('javascript:void(0);');
    removeBtn.click();
    browser.wait(() => ExpectedConditions.invisibilityOf(row), 5000);

    page.logout();
  });
});
