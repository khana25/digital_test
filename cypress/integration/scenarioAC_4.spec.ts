import BasePage from 'PageObjects/basePage';
import scenarioA from '../page-objects/pages/scenarioAC_1';
import scenarioB from '../page-objects/pages/scenarioAC_2';
import scenarioC from '../page-objects/pages/scenarioAC_3';
import scenarioD from '../page-objects/pages/scenarioAC_4';

describe('AC-4: As a subscribed member I can remove product(s) from my cart so that I can check out with a cart only containing the items I want', () => {
    beforeEach(() => {
      BasePage.VisitPage('/');
      scenarioA.verifyBrowserTitle();
      scenarioA.enterValidcredentials();
    });

    it('Given that I am on the inventory page with items in my basket', () => {
        //verify the shopping cart has 1 item
        scenarioC.addToCart();
        scenarioC.verifyShoppingCartCounter();

        //verify that the shopping cart has two items
        scenarioC.addToCartAnotherItem();
        scenarioC.verifyCartCounterIncremented();

        //remove item and verify that the item numbers have redcued from 2 to 1
        scenarioD.removeItem();
        scenarioC.verifyShoppingCartCounter();
    })

    it('Given that I have multiple items in my basket', () => {
        //Add multiple items in the shopping cart and view shopping cart
        scenarioD.addMultipleItemsToCart();
        scenarioD.viewShoppingCart();

        //verify that the 'Remove' button is visible for multiple items
        scenarioD.verifyRemoveItemButton();
    })

    it('Given that I am on the basket page with multiple items in it', () => {
        scenarioD.addMultipleItemsToCart();

        //remove 1 item from the shopping cart on the Shopping cart page
        scenarioD.removeItemFromShoppingCartPage();

        //verify item has been reduced from the shopping cart counter
        scenarioD.verifyShoppingCartReduced();
    })

    it('Given that I am on the basket page with an item in it and verify 0 items available afer removing all items', () => {
        scenarioD.addMultipleItemsToCart();

        //Remove all the items and verify 0 items available in the shopping cart
        scenarioD.verifyNoItemsAvailableInShoppingCart();
    })
});   