export default class BasePage {

  static SetMobileViewPort(): void {
    cy.viewport(375, 667);
  }

  static SetAndroidViewPort(): void {
    cy.viewport(360, 760);
  }

  static SetTabletViewPort(): void {
    cy.viewport('ipad-2');
  }

  static SetDesktopViewPort(): void {
    cy.viewport('macbook-16');
  }
  static SetLargeDesktopViewPort(): void {
    cy.viewport(1980, 1080);
  }

  static VisitPage(url): void {
    let visitingUrl = url;
    let domain = Cypress.env('test') || 'https://www.saucedemo.com/';

    if (typeof url === 'string' && domain && url.indexOf('http') < 0) {
      visitingUrl = `${domain}${url.replace(/^\//gim, '')}`;
    } else {
      domain = url.match(/((.*:\/\/).*?)\/|$/gim)[0];
    }
    Cypress.env('test', domain);

    cy.visit(visitingUrl);
  }
}
