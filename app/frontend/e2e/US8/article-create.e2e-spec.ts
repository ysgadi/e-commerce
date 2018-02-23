import {by, browser, ExpectedConditions} from 'protractor';
import {ArticleCreatePage} from './article-create.po';
import {ArticleDeletePage} from './../US10/article-delete.po';
import {ArticlesListPage} from './../US7/articles-list.po';

describe('article creation page', () => {
  let page: ArticleCreatePage;

  beforeEach(() => {
    page = new ArticleCreatePage();
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

  it(`should have a article creation form`, () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('Create Article');
    expect(page.getNameInput().isPresent()).toBe(true);
    expect(page.getDescriptionInput().isPresent()).toBe(true);
    expect(page.getPriceInput().isPresent()).toBe(true);
    expect(page.getCategorySelect().isPresent()).toBe(true);
    expect(page.getQuantityInput().isPresent()).toBe(true);
    expect(page.getSubmitInput().isPresent()).toBe(true);
    expect(page.getErrorDiv().isPresent()).toBe(false);
  });

  it('should throw an error message when name is empty', function () {
    page.navigateTo();
    page.getDescriptionInput().sendKeys('Un article sans nom');
    page.getPriceInput().sendKeys(5.40);
    page.selectCategoryField('AUTRE');
    page.getQuantityInput().sendKeys(2);
    page.getSubmitInput().click();
    expect(page.getNameInput().getAttribute('class')).toContain('ng-invalid');
  });

  it('should be able to create an article with correct inputs', function () {
    page.navigateTo();
    page.getNameInput().sendKeys('ArticleTest');
    page.getDescriptionInput().sendKeys('Un article avec un nom');
    page.getPriceInput().sendKeys(5.40);
    page.selectCategoryField('AUTRE');
    page.getQuantityInput().sendKeys(2);
    page.getSubmitInput().click();
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);

    // search on list
    const pageList = new ArticlesListPage();
    const row = pageList.getArticlesTableEntries().last();
    const cols = row.all(by.tagName('td'));
    expect(cols.get(0).getText()).toContain('ArticleTest');
    pageList.getViewLink(cols.get(0)).click();
    browser.wait(ExpectedConditions.urlContains('/article/'), 5000);

    // delete article
    const pageDelete = new ArticleDeletePage();
    pageDelete.getDeleteButton().click();
    expect(page.getErrorDiv().isPresent()).toBe(false);
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);
  });
});
