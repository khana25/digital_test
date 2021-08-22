import BasePage from 'PageObjects/basePage';
import scenarioA from '../page-objects/pages/scenarioAC_1';

describe('Ac-1: As a subscribed member I can log in using my credentials so that my account is securely accessible', () => {
  beforeEach(() => {
    BasePage.VisitPage('/');
    scenarioA.verifyBrowserTitle();
  });

  it('A user should get an error wihtout entering username or password', () => {
    // click the Login button without entering the username and password and verify the error
    scenarioA.clickLoginButton();
    scenarioA.verifyNoUsernameError();
  });

  it('Given that I have entered a username but no password and verify the password error', () => {
    //Enter the username 
    scenarioA.enterUsername();

    //Click Login button without entering the password
    scenarioA.clickLoginButton();

    //verify the password error
    scenarioA.verifyNoPasswordError();
  });

  it('Given that I have entered an incorrect username and password and verify username and password error', () => {

    //Enter an Invaid username and password and click Login button
    scenarioA.enterInvalidUsername();
    scenarioA.enterInvalidPassword();
    scenarioA.clickLoginButton();

    // Verify the invalid username and password error
    scenarioA.verifyInvalidUsernamePasswordError();
  });

  it('iven that I have entered a valid username and password and verify user successfully logged In', () => {

    //Enter valid credentails and click Login button
    scenarioA.enterUsername();
    scenarioA.enterPassword();
    scenarioA.clickLoginButton();

    //Verify that browser user has the redirect path "/inventory.html"
    scenarioA.verifyBrowserURLAfterSuccessfullyLoggedIn();
  });
});
