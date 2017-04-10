import { Redditang2Page } from './app.po';

describe('redditang2 App', () => {
  let page: Redditang2Page;

  beforeEach(() => {
    page = new Redditang2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
