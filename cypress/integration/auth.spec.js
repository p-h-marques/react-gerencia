/// <reference types="cypress" />

describe('logando usuário previamente autenticado', ()=>{
    before(()=>{
        cy.visit('http://localhost:3000/login')
    })

    it('prosseguindo sem email digitado', ()=>{
        cy.get('.sc-iBPRYJ').click()
        cy.get('.messages')
            .should('contain', 'email')
            .should('contain', 'inválido')
    })

    it('prosseguindo com email inválido', ()=>{
        cy.get('#email').type('testedeemailinválido{enter}')
        cy.get('.messages')
            .should('contain', 'email')
            .should('contain', 'inválido')
    })

    it('digitando email do usuário', ()=>{
        cy.get('#email').type('{selectAll}dg.pedromarques@gmail.com{enter}')
    })

    it('prosseguindo com senha vazia', ()=>{
        cy.get('.sc-iBPRYJ').click()
        cy.get('.messages')
            .should('contain', 'senha')
            .should('contain', 'inválida')
    })

    it('prosseguindo com senha incorreta', ()=>{
        cy.get('#newpass').type('senhaincorreta{enter}')
        cy.get('.messages')
            .should('contain', 'senha')
            .should('contain', 'inválida')
    })

    it('digitando senha do usuário', ()=>{
        cy.get('#newpass').type('{selectAll}teste1234{enter}')
    })

    it('certificando login bem sucedido', ()=>{
        cy.get('h1').should('contain','Bem-vindo,')
    })
})

describe('cadastrando novo usuário', ()=>{

})

describe('recuperando a senha', ()=>{

})