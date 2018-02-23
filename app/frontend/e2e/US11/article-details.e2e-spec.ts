import {browser, ExpectedConditions} from 'protractor';
import { ArticleDetailsPage } from './article-details.po';

describe('article details page', () => {
  let page: ArticleDetailsPage;

  beforeEach(() => {
    page = new ArticleDetailsPage();
  });

  it(`should have a Article Details fields`, () => {
    page.navigateTo();
    expect(page.getName().isPresent()).toBe(true);
    expect(page.getDescription().isPresent()).toBe(true);
    expect(page.getPrice().isPresent()).toBe(true);
    expect(page.getCategory().isPresent()).toBe(true);
    expect(page.getQuantity().isPresent()).toBe(true);
    expect(page.getOwnerButton().isPresent()).toBe(true);
    expect(page.getUpdateButton().isPresent()).toBe(false);
  });

  it(`should have existing article`, () => {
    page.navigateTo();
    expect(page.getName().getText()).toEqual('Computer PgWeb');
    expect(page.getDescription().getText()).toEqual('Computer used to develop a Web Project');
    expect(page.getPrice().getText()).toContain('210.5€');
    expect(page.getCategory().getText()).toContain('Informatique');
    expect(page.getQuantity().getText()).toContain('5');
    expect(page.getOwnerButton().getAttribute('href')).toMatch(/\/user\/1/);
  });

  it(`should have control actions when logged as owner`, () => {
    page.loginWithRoot();
    page.navigateTo();
    expect(page.getUpdateButton().isPresent()).toBe(true);
    expect(page.getUpdateButton().getAttribute('href')).toMatch(/\/article\/1\/update/);
    page.logout();
  });
});
