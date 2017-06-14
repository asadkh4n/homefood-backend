import { HomefoodfronendPage } from './app.po';

describe('homefoodfronend App', () => {
  let page: HomefoodfronendPage;

  beforeEach(() => {
    page = new HomefoodfronendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
