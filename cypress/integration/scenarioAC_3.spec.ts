import BasePage from 'PageObjects/basePage';
import scenarioA from '../page-objects/pages/scenarioAC_1';
import scenarioB from '../page-objects/pages/scenarioAC_2';
import scenarioC from '../page-objects/pages/scenarioAC_3';

describe('AC-3: As a subscribed member I can add product(s) to my cart so that I can build up an online order', () => {
  beforeEach(() => {
    BasePage.VisitPage('/');
    scenarioA.verifyBrowserTitle();
    scenarioA.enterValidcredentials();
  });

  it('Given that I am on the inventory shop page with an empty basket', () => {

      // Add an item to the shopping cart and verify the shopping cart counter
      scenarioC.addToCart();
      scenarioC.verifyRemoveButton();
      scenarioC.verifyShoppingCartCounter();
  });

  it('Given that I am on the inventory shop page with an item in my basket', () => {

      // Add multiple items to the shopping cart and verify that the shopping cart counter has been incremented
      scenarioC.addToCart();
      scenarioC.verifyShoppingCartCounter();
      scenarioC.addToCartAnotherItem();
      scenarioC.verifyCartCounterIncremented();
  })
});  