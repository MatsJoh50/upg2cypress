describe('Test booking', () => {

  it('clicking first "button" and later submit form', () => {
    cy.visit('http://127.0.0.1:5501/index.html')
    cy.contains('Take challenge').click({ multiple: true })

    //step 1
    cy.get('[data-cy="booking-date"]')
      .type('2023-12-10')
      .and('have.value', '2023-12-10')
      .should('have.attr', 'required')

    cy.contains('Search').click()

    //step 2
    cy.get('[data-cy="user-name"]')
      .type('your name')
      .and('have.value', 'your name')
      .should('have.attr', 'required')

    cy.get('[data-cy="e-mail"]')
      .type('email@.com')
    cy.get('[data-cy="e-mail"]').clear()
      .type('email@space.com')
      .should('have.attr', 'required')

    cy.get('[data-cy="time-slots"]')
      .select(['0'])
      .and('have.value', '0')
      .should('have.attr', 'required')

    cy.get('[data-cy="numb-participants"]')
      .select(['0'])
      .and('have.value', '0')
      .should('have.attr', 'required')

    cy.contains('Submit').click()
  })
})