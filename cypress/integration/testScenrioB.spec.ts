
import { click, type, clear } from '../page-objects/helpers';
import BasePage from 'PageObjects/basePage';

describe('Test B task', () => {
    before(() => {
        BasePage.VisitPage('/');
    });

    it('Test Scenario B second scenario - 1', () => {

        cy.get('.loan-calculator lendico-loan-calculator').shadow().find('.len-text-input__element').clear();
        cy.get('.loan-calculator lendico-loan-calculator').shadow().find('.len-text-input__element').type('40000', {force: true});

        cy.get('.loan-calculator lendico-loan-calculator').shadow().find('.len-custom-select__input__element').click({force: true});
        cy.get('.loan-calculator lendico-loan-calculator').shadow().find('.len-custom-select__options__item').eq(0).click({force: true});

        cy.get('.loan-calculator lendico-loan-calculator').shadow().find('.len-button').click({force: true});

        cy.get('.loan-calculator lendico-loan-calculator').shadow().find('.len-widget__property-wrapper').should('be.visible');

    });

    it('Test Scenario B second scenario - 2', () => {

        cy.get('.submit-container .button').scrollIntoView();
        cy.get('.submit-container .button').click({force:true});

        cy.get('.general-error-container .validation').contains('Nicht alle Felder wurden korrekt ausgefüllt. Bitte überprüfen Sie Ihre Angaben.');

    });

});