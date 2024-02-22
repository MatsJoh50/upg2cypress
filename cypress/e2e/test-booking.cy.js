const formattedDate = new Date().toJSON().slice(0, 10);

describe('Check for errors', () => {

  it('displays validation messages for required inputs', () => {

    cy.visit('https://matsjoh50.github.io/upg2cypress//index.html')
    cy.contains('Take challenge').click({ multiple: true })
    cy.contains('Search').click()    
    cy.contains('Submit booking')
    .should('not.exist');
  });

  it('Test request without body for 400 status', () => {
    cy.request({
      method: 'POST',
      url: 'https://lernia-sjj-assignments.vercel.app/api/booking/reservations',
      headers: {'Content-Type': 'application/json' },
      body: '',
      failOnStatusCode: false
    }).as('failRequest');
    cy.get('@failRequest').its('status')
    .should('equal', 400);
  });
});

describe('Test booking', () => {

  it('clicking first "button" and later submit form', () => {
    cy.visit('https://matsjoh50.github.io/upg2cypress//index.html')
    cy.contains('Take challenge').click({ multiple: true })

  
    
    //step 1 Ok
    cy.get('[data-cy="booking-date"]')
      .type(`${formattedDate}`)
      .and('have.value', `${formattedDate}`)
      .should('have.attr', 'required')

    cy.contains('Search').click()

    //step 2
    cy.get('[data-cy="user-name"]')
      .type('your name')
      .and('have.value', 'your name')
      .should('have.attr', 'required')

    cy.get('[data-cy="e-mail"]')
      .type('email@.com')

    cy.get('[data-cy="time-slots"]')
      .select(['0'])
      .and('have.value', '0')
      .should('have.attr', 'required')

    cy.get('[data-cy="numb-participants"]')
      .select(1)
      .should('have.attr', 'required')

    //test no submitting when invalid email
    cy.contains('Submit').click()

    cy.get('[data-cy="e-mail"]').clear()
      .type('inter@space.com')
      .should('have.attr', 'required')

    cy.contains('Submit').click()

    //step 3
    cy.contains('Back to challenges').click()
  })
})