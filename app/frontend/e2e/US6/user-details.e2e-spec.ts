import {browser, ExpectedConditions} from 'protractor';
import { UserDetailsPage } from './user-details.po';

describe('user details page', () => {
  let page: UserDetailsPage;

  beforeEach(() => {
    page = new UserDetailsPage();
  });

  it(`should have a User Details fields`, () => {
    page.navigateTo();
    expect(page.getHeader()).toEqual('Page of User');
    expect(page.getPseudo().isPresent()).toBe(true);
    expect(page.getName().isPresent()).toBe(true);
    expect(page.getIBAN().isPresent()).toBe(true);
  });

  it(`should have existing user`, () => {
    page.navigateTo();
    expect(page.getPseudo().getText()).toEqual('john-e-commerce');
    expect(page.getName().getText()).toEqual('john doe');
    expect(page.getIBAN().getText()).toContain('FR7610011000201234567890188');
  });
});
