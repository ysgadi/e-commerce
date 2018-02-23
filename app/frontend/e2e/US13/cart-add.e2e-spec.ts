import {browser, by, ExpectedConditions} from 'protractor';
import { CartAddPage } from './cart-add.po';
import { CartRemovePage } from './../US14/cart-remove.po';

describe('cart add article page', () => {
  let page: CartAddPage;

  beforeEach(() => {
    page = new CartAddPage();
    page.loginWithRoot();
  });

  afterEach(() => {
    page.logout();
  });

  it(`should not have button when not connected`, () => {
    page.logout();
    page.navigateTo();
    expect(page.getQuantityInput().isPresent()).toBe(false);
    expect(page.getAddToCartButton().isPresent()).toBe(false);
  });

  it(`should have button when connected`, () => {
    page.navigateTo();
    expect(page.getQuantityInput().isPresent()).toBe(true);
    expect(page.getAddToCartButton().isPresent()).toBe(true);
  });

  it('article should appear in cart list after select', () => {
    const pageRemove = new CartRemovePage();
    page.navigateTo();
    page.getQuantityInput().clear()
      .then(() => page.getQuantityInput().sendKeys(2));
    page.getAddToCartButton().click();

    browser.wait(ExpectedConditions.urlContains('/cart'), 5000);
    pageRemove.getArticlesTableEntries().then((rows) => {
      rows[0].all(by.tagName('td')).then((columns) => {
        const viewLnk = pageRemove.getViewLink(columns[0]);
        expect(viewLnk.getAttribute('href')).toMatch(/\/article\/1/);
        expect(columns[0].getText()).toEqual('Computer PgWeb');
        expect(columns[1].getText()).toEqual('210.5€');
        expect(columns[2].getText()).toEqual('2');

        pageRemove.getRemoveButton(columns[3]).click();
      });
      browser.wait(() => ExpectedConditions.invisibilityOf(rows[0]), 5000);
    });
  });
});
