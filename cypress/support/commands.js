import "cypress-localstorage-commands"

Cypress.Commands.add('assertMessage', (field)=>{
    cy.get('.messages')
        .should('contain', field)
})