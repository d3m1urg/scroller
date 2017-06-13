import { ScrollerPage } from './app.po';

describe('scroller App', () => {
  let page: ScrollerPage;

  beforeEach(() => {
    page = new ScrollerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
