import { click, type, clear } from '../page-objects/helpers';
import BasePage from 'PageObjects/basePage';
import { randomUser } from 'PageObjects/helpers';

describe('Test A task', () => {
  let user = randomUser();

  let email = user.fname + user.sname + '@mail.com';
  let street = 'talstr. 97';
  let postcode = '40217';
  let city = 'Dusseldorf';
  let phone = '15903904456';
  let country = 'Deutschland';
  

  it('Test Scenario A', () => {

    BasePage.VisitPage('/');

    cy.title().should('eq', 'static-antrag')

    cy.get('.borrower-form-container [name="search.Firmenname"]').scrollIntoView();
    expect('.borrower-form-container [name="search.Firmenname"]');
    type('.borrower-form-container [name="search.Firmenname"]', 'Gmbh');
    click('.company-name', {force: true});


    cy.get('.first-column > [data-v-1f5f6572=""][data-v-3b5fe05d=""] > .form-group > .len-custom-select > .len-custom-select__input').click();
    click('.len-custom-select__options__item', {force: true});


    cy.get('.radio-container [value="before50K"]').scrollIntoView();
    cy.get('.radio-container [value="before50K"]').click({force: true});
    cy.get('.form-group [name="search.BillingStreet"]').scrollIntoView();
    clear('.form-group [name="search.BillingStreet"]');
    type('.form-group [name="search.BillingStreet"]', 'Mannesmannufer 2');

    cy.get('.form-group [name="search.postcodeDe"]').scrollIntoView();
    clear('.form-group [name="search.postcodeDe"]');
    type('.form-group [name="search.postcodeDe"]', '40213');

    cy.get('.form-group [name="search.city"]').scrollIntoView();
    clear('.form-group [name="search.city"]');
    type('.form-group [name="search.city"]', 'Dusseldorf');

    cy.get('.form-group [name="Date_Founded__c"]').scrollIntoView();
    clear('.form-group [name="Date_Founded__c"]');
    type('.form-group [name="Date_Founded__c"]', '022020');

    cy.get('.second-column > [data-v-1f5f6572=""][data-v-3b5fe05d=""] > .form-group > .len-custom-select > .len-custom-select__input').click();
    click('.len-custom-select__options__item', {force: true});


    // Fill up the form with personal details
    click('.salutation-container .radio-container [value="Herr"]', {force: true});

    type('[name="search.FirstName"]', user.fname);
    
    type('[name="search.LastName"]', user.sname);

    type('[name="dob"]', '01.12.1990');

    type('[name="search.nationality"]', country);

    type('[name="search.mobilePhone"]',  phone);

    type('[name="search.Email"]', email);

    type('[name="search.UserStreet"]', street);

    type('[name="search.userPostcodeDe"]', postcode );

    type('[name="search.userCity"]', city);

    cy.get('.section-form [name="Terms_Conditions_Timestamp__c"]').click({force: true});

    //Submit the application

    cy.get('.submit-container [type="submit"]').click({force: true});


    //Verify the data after confirmation 
    cy.contains('.top-header__title', 'Vielen Dank für Ihre Anfrage');
    cy.get('.thank-you-content__blocks').scrollIntoView();


   cy.get('.thank-you-content__data-block-row__text').then(($txt) => {
    expect($txt).to.contain(user.fname);
    expect($txt).to.contain(user.sname);
    expect($txt).to.contain(email);
    expect($txt).to.contain(street, postcode);
    expect($txt).to.contain(phone);
  })

  });
});
