import { WeddingAppPage } from './app.po';

describe('wedding-app App', () => {
  let page: WeddingAppPage;

  beforeEach(() => {
    page = new WeddingAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
