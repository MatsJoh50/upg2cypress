describe('Test indexs links to challange page', () => {

    it('Clicking all the onsite-challange buttons', () => {
        cy.visit('http://127.0.0.1:5501/index.html')
        cy.contains('Online challenges').click({ multiple: true, force: true })
        cy.url().should('include', '/filter.htm?online')
    });
    
    it('Clicking all the online-challange buttons', () => {
        cy.visit('http://127.0.0.1:5501/index.html')
        cy.contains('On-site challenges').click({ multiple: true, force: true })
        cy.url().should('include', '/filter.htm?onsite')
    });
    it('Clicking the "See all challanges" button', () => {
        cy.visit('http://127.0.0.1:5501/index.html');
        cy.contains('See all challenges').click();
        cy.url().should('include', '/filter.htm')
    })

})

describe('Test the filter functions', () => {
    
    it('Clicking the filter challange button', () =>  {
        cy.visit('http://127.0.0.1:5501/filter.htm');
        cy.contains('Filter challenges').click();
        cy.contains('By Type')

    })
})
