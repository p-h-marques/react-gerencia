import {STORAGE_SESSION} from '../../src/functions/auth'

// const url = 'https://gerencia-771f4.web.app/login'
const url = 'http://localhost:3000'

Cypress.Commands.add('assertMessage', field => {
    cy.get('.messages')
        .should('contain', field)
})

Cypress.Commands.add('resetNavigator', ()=>{
    cy.window().its('sessionStorage').invoke('removeItem', STORAGE_SESSION)
    cy.visit(url)
})

Cypress.Commands.add('assertLogin', user => {
    cy.get('h1').should('contain','Bem-vindo,')
    cy.get(':nth-child(1) > .description').should('contain', user.email)
    cy.get(':nth-child(2) > .description').should('contain', user.name)
})