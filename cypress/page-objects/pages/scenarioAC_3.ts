import BasePage from '../basePage';
import { click, type, expect, clear } from '../helpers';

export default class scenarioC extends BasePage {
    static addToCart(): void {
        click('#add-to-cart-sauce-labs-backpack');  
    }

    static verifyRemoveButton(): void {
        cy.get('#remove-sauce-labs-backpack').contains('Remove');
        expect('#remove-sauce-labs-backpack');
    }

    static verifyShoppingCartCounter(): void {
        cy.get('.shopping_cart_badge').scrollIntoView();
        cy.get('.shopping_cart_badge').contains('1');
    }

    static verifyCartCounterIncremented(): void {
        cy.get('.shopping_cart_badge').scrollIntoView();
        cy.get('.shopping_cart_badge').contains('2');
    }

    static addToCartAnotherItem(): void {
        click('#add-to-cart-sauce-labs-bike-light');
    }
}    