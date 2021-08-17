// prettier-ignore
const FIRST_NAMES = ['Adam', 'Alex', 'Aaron', 'Ben', 'Carl', 'Dan', 'David', 'Edward', 'Fred', 'Frank', 'George', 'Hal', 'Hank', 'Ike', 'John', 'Jack', 'Joe', 'Larry', 'Monte', 'Matthew', 'Mark', 'Nathan', 'Otto', 'Paul', 'Peter', 'Roger', 'Roger', 'Steve', 'Thomas', 'Tim', 'Ty', 'Victor', 'Walter'];
// prettier-ignore
const LAST_NAMES = ['Anderson', 'Ashwoon', 'Aikin', 'Bateman', 'Bongard', 'Bowers', 'Boyd', 'Cannon', 'Cast', 'Deitz', 'Dewalt', 'Ebner', 'Frick', 'Hancock', 'Haworth', 'Hesch', 'Hoffman', 'Kassing', 'Knutson', 'Lawless', 'Lawicki', 'Mccord', 'McCormack', 'Miller', 'Myers', 'Nugent', 'Ortiz', 'Orwig', 'Ory', 'Paiser', 'Pak', 'Pettigrew', 'Quinn', 'Quizoz', 'Ramachandran', 'Resnick', 'Sagar', 'Schickowski', 'Schiebel', 'Sellon', 'Severson', 'Shaffer', 'Solberg', 'Soloman', 'Sonderling', 'Soukup', 'Soulis', 'Stahl', 'Sweeney', 'Tandy', 'Trebil', 'Trusela', 'Trussel', 'Turco', 'Uddin', 'Uflan', 'Ulrich', 'Upson', 'Vader', 'Vail', 'Valente', 'Van Zandt', 'Vanderpoel', 'Ventotla', 'Vogal', 'Wagle', 'Wagner', 'Wakefield', 'Weinstein', 'Weiss', 'Woo', 'Yang', 'Yates', 'Yocum', 'Zeaser', 'Zeller', 'Ziegler', 'Bauer', 'Baxster', 'Casal', 'Cataldi', 'Caswell', 'Celedon', 'Chambers', 'Chapman', 'Christensen', 'Darnell', 'Davidson', 'Davis', 'DeLorenzo', 'Dinkins', 'Doran', 'Dugelman', 'Dugan', 'Duffman', 'Eastman', 'Ferro', 'Ferry', 'Fletcher', 'Fietzer', 'Hylan', 'Hydinger', 'Illingsworth', 'Ingram', 'Irwin', 'Jagtap', 'Jenson', 'Johnson', 'Johnsen', 'Jones', 'Jurgenson', 'Kalleg', 'Kaskel', 'Keller', 'Leisinger', 'LePage', 'Lewis', 'Linde', 'Lulloff', 'Maki', 'Martin', 'McGinnis', 'Mills', 'Moody', 'Moore', 'Napier', 'Nelson', 'Norquist', 'Nuttle', 'Olson', 'Ostrander', 'Reamer', 'Reardon', 'Reyes', 'Rice', 'Ripka', 'Roberts', 'Rogers', 'Root', 'Sandstrom', 'Sawyer', 'Schlicht', 'Schmitt', 'Schwager', 'Schutz', 'Schuster', 'Tapia', 'Thompson', 'Tiernan', 'Tisler'];

class User {
  randomNumber = Math.ceil(Math.random() * 100000000);
  public password = `${Math.floor(Math.random() * 1) + 10000000}`;

  constructor(public fname, public sname) {}
  fullName(): string {
    return `${this.fname} ${this.sname}`;
  }
  email(): string {
    return `${this.fname.toLowerCase()}.${this.sname.toLowerCase()}${this.randomNumber}@mail.com`;
  }
}

/**
 * Get a random user
 * @returns
 */
export function randomUser(): User {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];

  return new User(first, last);
}

/**
 * A simple click event on the first element
 * @param selector
 * @param options
 */
export function click(selector: string, options?: Partial<Cypress.ClickOptions>): void {
  cy.get(selector).eq(0).click(options);
}

export function type(selector: string, text: string): void {
  cy.get(selector).type(text, { force: true });
}

export function expect(selector: string): void {
  cy.get(selector).should('be.visible');
}

export function clear(selector: string): void {
  cy.get(selector).clear({ force: true });
}
