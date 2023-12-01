describe('Test button challenge card', () => {
  it('clicking first "button"', () => {
    cy.visit('http://127.0.0.1:5501/index.html')

    cy.get('button').click({multiple: true})
  })
})