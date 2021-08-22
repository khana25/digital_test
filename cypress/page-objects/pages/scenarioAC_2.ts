import BasePage from '../basePage';
import { click, type, expect, clear } from '../helpers';

export default class scenarioB extends BasePage {
    static focusOnUsernameField(): void {
        cy.get('#user-name').focus();
    }

    static hitTabKeyAfterUsername(): void {
        cy.get('#user-name').tab();
    }

    static verifyFocusedElementPassword(): void {
        cy.focused().should('have.attr', 'name', 'password')
    }

    static verifyFocusedLoginButton(): void {
       cy.focused().should('have.attr', 'name', 'login-button')
    }

     static hitTabKeyAfterPassword(): void {
        cy.get('#password').tab();
    }
}    