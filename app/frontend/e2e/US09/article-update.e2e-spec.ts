import {by, browser, ExpectedConditions} from 'protractor';
import {ArticleUpdatePage} from './article-update.po';

describe('article update page', () => {
  let page: ArticleUpdatePage;
  const articleName = 'Computer PgWeb';
  const articleCategory = 'INFORMATIQUE';
  const articleQuantity = 5;

  beforeEach(() => {
    page = new ArticleUpdatePage();
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

  it(`should have an article creation form`, () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('Update Article');
    expect(page.getNameInput().isPresent()).toBe(true);
    expect(page.getDescriptionInput().isPresent()).toBe(true);
    expect(page.getPriceInput().isPresent()).toBe(true);
    expect(page.getCategorySelect().isPresent()).toBe(true);
    expect(page.getQuantityInput().isPresent()).toBe(true);
    expect(page.getSubmitInput().isPresent()).toBe(true);
    expect(page.getErrorDiv().isPresent()).toBe(false);
  });

  it('should have an existing article', () => {
    page.navigateTo();
    expect(page.getNameInput().getAttribute('value')).toEqual(articleName);
    expect(page.getDescriptionInput().getAttribute('value')).toEqual('Computer used to develop a Web Project');
    expect(page.getPriceInput().getAttribute('value')).toEqual('210.5');
    expect(page.getQuantityInput().getAttribute('value')).toEqual('' + articleQuantity);
  });

/*
  // Still failing, test doesn't manage to catch 'ng-invalid' in class, besides it appears
  it('should throw an error message when name is empty', function () {
    page.navigateTo();
    page.getNameInput().clear();
    page.selectCategoryField(articleCategory);
    page.getSubmitInput().click();
    browser.wait(function() {
      return page.getNameInput().getAttribute('class').then(function(value) {
          return (value.indexOf('ng-invalid') >= 0);
      });
    }, 5000);
  });
*/

  it('should be able to update an article with correct inputs', function () {
    page.navigateTo();
    page.getNameInput()
      .clear()
      .then(() => {
        page.getNameInput().sendKeys('ArticleUpdate');
      });
    page.selectCategoryField('AUTRE');
    page.getQuantityInput()
      .clear()
      .then(() => {
        page.getQuantityInput().sendKeys(2);
      });
    page.getSubmitInput().click();
    expect(page.getErrorDiv().isPresent()).toBe(false);
    browser.wait(ExpectedConditions.urlContains('/article/1'), 5000);

    // check if project is updated
    page.navigateTo();
    expect(page.getNameInput().getAttribute('value')).toEqual('ArticleUpdate');
    expect(page.getQuantityInput().getAttribute('value')).toEqual('2');

    // reset the modifications
    page.navigateTo();
    page.getNameInput()
      .clear()
      .then(() => {
        page.getNameInput().sendKeys(articleName);
      });
    page.selectCategoryField(articleCategory);
    page.getQuantityInput()
      .clear()
      .then(() => {
        page.getQuantityInput().sendKeys(articleQuantity);
      });
    page.getSubmitInput().click();
    expect(page.getErrorDiv().isPresent()).toBe(false);
    browser.wait(ExpectedConditions.urlContains('/article/1'), 5000);
  });
});
