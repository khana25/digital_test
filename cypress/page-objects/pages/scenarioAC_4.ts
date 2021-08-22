import BasePage from '../basePage';
import { click, type, expect, clear } from '../helpers';

export default class scenarioD extends BasePage {
    static removeItem(): void {
        click('#remove-sauce-labs-bike-light');
    }

    static addMultipleItemsToCart(): void {
        click('#add-to-cart-sauce-labs-backpack'); 
        click('#add-to-cart-sauce-labs-bike-light'); 
    }

    static viewShoppingCart(): void {
        click('.shopping_cart_link');
    }

    static verifyRemoveItemButton(): void {
        expect('#remove-sauce-labs-backpack');
        cy.get('#remove-sauce-labs-backpack').contains('Remove');
        expect('#remove-sauce-labs-bike-light');
        cy.get('#remove-sauce-labs-bike-light').contains('Remove');
    }

    static removeItemFromShoppingCartPage(): void {
        click('.shopping_cart_link');
        cy.get('.shopping_cart_badge').contains('2');
        click('.shopping_cart_link');
        click('#remove-sauce-labs-backpack');
        cy.get('.shopping_cart_badge').contains('1');
    }

    static verifyShoppingCartReduced(): void {
        cy.get('.shopping_cart_badge').contains('1');
    }

    static verifyNoItemsAvailableInShoppingCart(): void {
        click('.shopping_cart_link');
        cy.get('.shopping_cart_badge').contains('2');
        click('.shopping_cart_link');
        click('#remove-sauce-labs-backpack');
        cy.get('.shopping_cart_badge').contains('1');
        click('#remove-sauce-labs-bike-light');
        cy.get('.shopping_cart_link').eq(0);
    }
}