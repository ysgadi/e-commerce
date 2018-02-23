import {browser, ExpectedConditions} from 'protractor';
import { AppPage } from './app.po';

describe('frontend App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should redirect to /home', () => {
    page.navigateTo();
    browser.wait(ExpectedConditions.urlContains('/home'), 5000);
  });
});
