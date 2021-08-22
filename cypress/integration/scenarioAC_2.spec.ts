import BasePage from 'PageObjects/basePage';
import scenarioA from '../page-objects/pages/scenarioAC_1';
import scenarioB from '../page-objects/pages/scenarioAC_2';

describe('AC-2: As a subscribed member I can use keyboard controls to navigate the login form so that the page meets accessibility guidelines', () => {
  beforeEach(() => {
    BasePage.VisitPage('/');
    scenarioA.verifyBrowserTitle();
  });

  it('Given that I am currently focused on the username field', () => {
      //Try to focus the element on the username textfiled
      scenarioB.focusOnUsernameField();
      
      // Hit tab key after having a focus on the username textfield
      scenarioB.hitTabKeyAfterUsername();

      // Verify that the focus has shifted from the username to the password textfield
      scenarioB.verifyFocusedElementPassword();
  });

  it('Given that I am currently focused on the password field', () => {
      //Try to focus the element on the username textfiled and enter the username
      scenarioB.focusOnUsernameField();
      scenarioA.enterUsername();

      // Hit tab key after having a focus on the username textfield and enter the password
      scenarioB.hitTabKeyAfterUsername();
      scenarioA.enterPassword();

      // // Hit tab key after having a focus on the password textfield and verify the focus has shifted to the Login button
      scenarioB.hitTabKeyAfterPassword();
      scenarioB.verifyFocusedLoginButton();
  });

  it('Given that I have the submit button in focus', () => {

      // Focus is on the username field, hit tab key to shift focus to the password, hit tab key again 
      //and verify the focus is on the Login page and click the Login button
      scenarioB.focusOnUsernameField();
      scenarioA.enterUsername();
      scenarioB.hitTabKeyAfterUsername();
      scenarioA.enterPassword();
      scenarioB.hitTabKeyAfterPassword();
      scenarioA.clickLoginButton();

      // Verify that the user has been successfully logged In
      scenarioA.verifyBrowserURLAfterSuccessfullyLoggedIn();
  });
});  