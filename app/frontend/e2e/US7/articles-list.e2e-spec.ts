import {browser, by, ExpectedConditions} from 'protractor';
import {ArticlesListPage} from './articles-list.po';

describe('articles list', () => {
  let page: ArticlesListPage;

  beforeEach(() => {
    page = new ArticlesListPage();
  });

  it('should display table of articles', () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('All Articles');
    expect(page.getArticlesTable().isPresent()).toBe(true);
    expect(page.getArticlesTableEntries().isPresent()).toBe(true);
  });

  it('should contain computer article in first row', () => {
    page.navigateTo();
    page.getArticlesTableEntries().then((rows) => {
      rows[0].all(by.tagName('td')).then((columns) => {
        const viewLnk = page.getViewLink(columns[0]);
        expect(viewLnk.isPresent()).toBe(true);
        expect(viewLnk.getAttribute('href')).toMatch(/\/article\/1/);
        expect(columns[0].getText()).toContain('Computer PgWeb');
        expect(columns[0].getText()).toContain('Decription: Computer used to');
        expect(columns[0].getText()).toContain('Price: 210.5€');
        expect(columns[0].getText()).toContain('Category: Informatique');
      });
    });
  });

  it('should contain create and search button', () => {
    page.navigateTo();
    expect(page.getCreateButton().isPresent()).toBe(true);
    expect(page.getSearchButton().isPresent()).toBe(true);
  });
});

