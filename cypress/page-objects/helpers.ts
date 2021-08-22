/**
 * A simple click event on the first element
 * @param selector
 * @param options
 */
export function click(selector: string, options?: Partial<Cypress.ClickOptions>): void {
  cy.get(selector).eq(0).click(options);
}

export function type(selector: string, text: string): void {
  cy.get(selector).type(text, { force: true });
}

export function expect(selector: string): void {
  cy.get(selector).should('be.visible');
}

export function clear(selector: string): void {
  cy.get(selector).clear({ force: true });
}
