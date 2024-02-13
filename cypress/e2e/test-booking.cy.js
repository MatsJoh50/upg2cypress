
// Create a new Date object representing today's date
var today = new Date();

// Get the year, month, and day components of today's date
var year = today.getFullYear();
// Month is zero-based, so we add 1 to get the actual month
var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Pad single-digit months with a leading zero
var day = today.getDate().toString().padStart(2, '0'); // Pad single-digit days with a leading zero

// Concatenate the components with the desired format
var formattedDate = year + '-' + month + '-' + day;


describe('Test booking', () => {

  it('clicking first "button" and later submit form', () => {
    cy.visit('http://127.0.0.1:5501/index.html')
    cy.contains('Take challenge').click({ multiple: true })

    //step 1
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