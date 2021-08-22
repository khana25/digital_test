import BasePage from '../basePage';
import { click, type, expect, clear } from '../helpers';

export default class scenarioA extends BasePage {

    static verifyBrowserTitle(): void {
        cy.title().should('eq', 'Swag Labs');
    }

    static clickLoginButton(): void {
        click('#login-button', {force: true});
    }

    static verifyNoUsernameError(): void {
        expect('.error-message-container');
        cy.get('.error-message-container').contains('Epic sadface: Username is required');
    }

    static verifyNoPasswordError(): void {
        expect('.error-message-container');
        cy.get('.error-message-container').contains('Epic sadface: Password is required');
    }

    static enterInvalidUsername(): void {
        type('#user-name', 'test123_user');
    }

    static enterInvalidPassword(): void {
        type('#password', 'test123_password');
    }

    static verifyInvalidUsernamePasswordError(): void {
        expect('.error-message-container');
        cy.get('.error-message-container').contains('Epic sadface: Username and password do not match any user in this service');
    }

    static enterUsername(): void {
        type('#user-name', 'standard_user');
    }

    static enterPassword(): void {
        type('#password', 'secret_sauce');
    }

    static enterValidcredentials(): void {
        type('#user-name', 'standard_user');
        type('#password', 'secret_sauce');
        click('#login-button', {force: true});
        cy.url().should('include', '/inventory.html')
    }
    static verifyBrowserURLAfterSuccessfullyLoggedIn(): void {
        cy.url().should('include', '/inventory.html')
    }
}
