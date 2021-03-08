/// <reference types="cypress" />

import {STORAGE_RECOVER} from '../../src/functions/auth'

const url = 'https://gerencia-771f4.web.app/login'

const userTest = {
    email: 'dg.pedromarques@gmail.com',
    name: 'Pedro Marques',
    password: 'teste1234',
    newEmail: 'pedrohenriquesv@outlook.com',
    newName: 'Pedro Henrique',
    newPassword: 'asdf1709',
    wrongEmail: 'testedeemailinválido',
    wrongPassword: 'senhaincorreta',
    wrongName: 'zé',
    wrongRecoverCode: '999999',
    recoverCode: '123456'
}

describe('logando usuário previamente autenticado', ()=>{
    before(()=>{
        cy.visit(url)
    })

    it('prosseguindo sem email digitado', ()=>{
        cy.get('.sc-iBPRYJ').click()
        cy.assertMessage('email')
    })

    it('prosseguindo com email inválido', ()=>{
        cy.get('#email').type(`${userTest.wrongEmail}{enter}`)
        cy.assertMessage('email')
    })

    it('digitando email do usuário', ()=>{
        cy.get('#email').type(`{selectAll}${userTest.email}{enter}`)
    })

    it('prosseguindo com senha vazia', ()=>{
        cy.get('.sc-iBPRYJ').click()
        cy.assertMessage('senha')
    })

    it('prosseguindo com senha incorreta', ()=>{
        cy.get('#newpass').type(`${userTest.wrongPassword}{enter}`)
        cy.assertMessage('senha')
    })

    it('digitando senha do usuário', ()=>{
        cy.get('#newpass').type(`{selectAll}${userTest.password}{enter}`)
    })

    it('certificando login bem sucedido', ()=>{
        cy.get('h1').should('contain','Bem-vindo,')
        cy.get(':nth-child(1) > .description').should('contain', userTest.email)
        cy.get(':nth-child(2) > .description').should('contain', userTest.name)
    })
})

describe('cadastrando novo usuário', ()=>{
    before(()=>{
        cy.visit(url)
    })

    it('digitando email do novo usuário', ()=>{
        cy.get('#email').type(`{selectAll}${userTest.newEmail}{enter}`)
    })

    it('retornando para tentar outro email', ()=>{
        cy.get('.highlight').should('contain', 'sim, vamos lá!')

        cy.get('.buttons > :nth-child(2)')
            .should('contain', 'quero tentar outro email...')
            .click()
    })

    it('digitando, de novo, email do novo usuário', ()=>{
        cy.get('#email').type(`{selectAll}${userTest.newEmail}{enter}`)
    })

    it('prosseguindo para criar uma nova conta', ()=>{
        cy.get('.highlight').click()
    })

    it('tentando prosseguir sem digitar o nome', ()=>{
        cy.get('.sc-iBPRYJ').click()
        cy.assertMessage('nome')
    })

    it('tentando prosseguir com um nome inválido', ()=>{
        cy.get('#name').type(`${userTest.wrongName}{enter}`)
        cy.assertMessage('nome')
    })

    it('prosseguindo com o nome e senha corretos, e finalizando login', ()=>{
        cy.get('#name').type(`{selectAll}${userTest.newName}{enter}`)
        cy.get('#pass').type(`${userTest.newPassword}{enter}`)
    })

    it('finalizando login', ()=>{
        cy.get('h1').should('contain', `Bem-vindo, ${userTest.newName}!`)
        cy.get(':nth-child(1) > .description').should('contain', userTest.newEmail)
        cy.get(':nth-child(2) > .description').should('contain', userTest.newName)
    })
})

describe('recuperando a senha', ()=>{
    before(()=>{
        cy.visit(url)
    })

    it('entrando no fluxo de recuperação de senha', ()=>{
        cy.get('[data-cy=footerLink]').should('contain', 'Esqueceu sua senha?').click()
        cy.get('[data-cy=footerLink]').should('contain', 'Voltar ao login normal')

        cy.get('h1').should(
            'contain',
            'precisamos saber seu email:'
        )
    })

    it('voltando ao fluxo normal de login, e depois retornando à recuperação de senha', ()=>{
        cy.get('[data-cy=footerLink]').click()
        cy.get('[data-cy=footerLink]').should('contain', 'Esqueceu sua senha?')
        cy.get('[data-cy=footerLink]').click()
    })

    it('inserindo email inexistente', ()=>{
        cy.get('#recoveremail').type(`${userTest.newEmail}{enter}`)
        cy.assertMessage('email')
    })

    it('inserindo email existente e retornando ao login normal', ()=>{
        cy.get('#recoveremail').type(`{selectAll}${userTest.email}{enter}`)
        cy.get('.highlight').should('contain', 'inserir código')
        cy.get('.buttons > :nth-child(2)').should('contain', 'tentar logar de novo...')
        cy.get('.buttons > :nth-child(2)').click()
    })

    it('retornando à recuperação de senha', ()=>{
        cy.get('[data-cy=footerLink]').click()
        cy.get('#recoveremail').should('have.value', userTest.email)
        cy.get('.sc-iBPRYJ').click()
    })

    it('tentando seguir com código de recuperação vazio', ()=>{
        cy.get('.highlight').click()
        cy.get('#recovercode').type('{enter}')
        cy.assertMessage('código de recuperação')
    })

    it('tentando seguir com código de recuperação incorreto', ()=>{
        cy.setLocalStorage(STORAGE_RECOVER, userTest.recoverCode)
        cy.get('#recovercode').type(`${userTest.wrongRecoverCode}{enter}`)
        cy.getLocalStorage(STORAGE_RECOVER).should('equal', userTest.recoverCode)
    })

    it('inserindo o código de recuperação de senha correto', ()=>{
        cy.setLocalStorage(STORAGE_RECOVER, userTest.recoverCode)
        cy.get('#recovercode').type(`{selectAll}${userTest.recoverCode}{enter}`)
    })

    it('finalizando recuperação de senha', ()=>{
        cy.get('h1').should('contain', `Bem-vindo, ${userTest.name}!`)
        cy.get(':nth-child(1) > .description').should('contain', userTest.email)
        cy.get(':nth-child(2) > .description').should('contain', userTest.name)
    })
})