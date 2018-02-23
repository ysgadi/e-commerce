import {browser, by, ExpectedConditions} from 'protractor';
import { ArticleDeletePage } from './article-delete.po';
import { ArticleCreatePage } from './../US8/article-create.po';
import { ArticlesListPage } from './../US7/articles-list.po';

describe('article delete component', () => {
  let page: ArticleDeletePage;

  beforeEach(() => {
    page = new ArticleDeletePage();
    page.loginWithRoot();
  });

  afterEach(() => {
    page.logout();
  });

  it(`should not have delete action when not logged as owner`, () => {
    page.logout();
    page.navigateTo();
    expect(page.getDeleteButton().isPresent()).toBe(false);
    page.loginWithOther('lambda@pgweb-13.fr', 'lambda');
    page.navigateTo();
    expect(page.getDeleteButton().isPresent()).toBe(false);
  });

  it(`should have control actions when logged as owner`, () => {
    page.navigateTo();
    expect(page.getDeleteButton().isPresent()).toBe(true);
    expect(page.getDeleteButton().getAttribute('href')).toEqual('javascript:void(0);');
  });

  it(`should delete article on click`, () => {
    // create article
    const pageCreate = new ArticleCreatePage();
    pageCreate.navigateTo();
    pageCreate.getNameInput().sendKeys('ArticleToDelete');
    pageCreate.getDescriptionInput().sendKeys('this article should be deleted');
    pageCreate.getPriceInput().sendKeys(5.40);
    pageCreate.selectCategoryField('AUTRE');
    pageCreate.getSubmitInput().click();
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);

    // search on list
    const pageList = new ArticlesListPage();
    const row = pageList.getArticlesTableEntries().last();
    const cols = row.all(by.tagName('td'));
    expect(cols.get(0).getText()).toContain('ArticleToDelete');
    pageList.getViewLink(cols.get(0)).click();
    browser.wait(ExpectedConditions.urlContains('/article/'), 5000);

    // delete article
    page.getDeleteButton().click();
    expect(page.getErrorDiv().isPresent()).toBe(false);
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);
  });
});
