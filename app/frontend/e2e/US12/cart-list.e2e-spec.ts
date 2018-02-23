import {browser, by, ExpectedConditions} from 'protractor';
import {CartListPage} from './cart-list.po';

describe('cart\'s articles list', () => {
  let page: CartListPage;

  beforeEach(() => {
    page = new CartListPage();
    page.loginWithRoot();
  });

  afterEach(() => {
    page.logout();
  });

  it('should be redirected to /login for non authenticated user', () => {
    page.logout();
    page.navigateTo();
    browser.wait(ExpectedConditions.urlContains('/login'), 5000);
  });

  it('should display table of articles', () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('All Articles in your Cart');
    expect(page.getArticlesTable().isPresent()).toBe(true);

    const headers = page.getArticlesTableHeaders();
    expect(headers.count()).toBe(4);
    expect(headers.get(0).getText()).toEqual('Name');
    expect(headers.get(1).getText()).toEqual('Price');
    expect(headers.get(2).getText()).toEqual('Quantity');
    expect(headers.get(3).getText()).toEqual('');
  });

  it('should contain car article in first row', () => {
    page.navigateTo();
    page.getArticlesTableEntries().then((rows) => {
      rows[0].all(by.tagName('td')).then((columns) => {
        const viewLnk = page.getViewLink(columns[0]);
        expect(viewLnk.isPresent()).toBe(true);
        expect(viewLnk.getAttribute('href')).toMatch(/\/article\/2/);
        expect(columns[0].getText()).toEqual('A great car');
        expect(columns[1].getText()).toEqual('5999.99€');
        expect(columns[2].getText()).toEqual('1');
      });
    });
  });
});
