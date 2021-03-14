/// <reference types="cypress" />

import {STORAGE_RECOVER} from '../../src/functions/auth'
import loc from '../support/locators'

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
        cy.resetNavigator()
    })

    it('prosseguindo sem email digitado', ()=>{
        cy.get(loc.asideButton).click()
        cy.assertMessage('email')
    })

    it('prosseguindo com email inválido', ()=>{
        cy.get(loc.userEmail).type(`${userTest.wrongEmail}{enter}`)
        cy.assertMessage('email')
    })

    it('digitando email do usuário', ()=>{
        cy.get(loc.userEmail).type(`{selectAll}${userTest.email}`)
        cy.get(loc.asideButton).click()
    })

    it('prosseguindo com senha vazia', ()=>{
        cy.get(loc.asideButton).click()
        cy.assertMessage('senha')
    })

    it('prosseguindo com senha incorreta', ()=>{
        cy.get(loc.userPass).type(`${userTest.wrongPassword}{enter}`)
        cy.assertMessage('senha')
    })

    it('digitando senha do usuário', ()=>{
        cy.get(loc.userPass).type(`{selectAll}${userTest.password}{enter}`)
    })

    it('certificando login bem sucedido', ()=>{
        cy.assertLogin({ email: userTest.email, name: userTest.name })
    })

    it('verificando persistência do login no reload', ()=>{
        cy.reload()
        cy.assertLogin({ email: userTest.email, name: userTest.name })
    })
})

describe('cadastrando novo usuário', ()=>{
    before(()=>{
        cy.resetNavigator()
    })

    it('digitando email do novo usuário', ()=>{
        cy.get(loc.userEmail).type(`{selectAll}${userTest.newEmail}{enter}`)
    })

    it('retornando para tentar outro email', ()=>{
        cy.get(loc.highlightButton).should('contain', 'sim, vamos lá!')

        cy.get(loc.normalButton)
            .should('contain', 'quero tentar outro email...')
            .click()
    })

    it('digitando, de novo, email do novo usuário', ()=>{
        cy.get(loc.userEmail).type(`{selectAll}${userTest.newEmail}{enter}`)
    })

    it('prosseguindo para criar uma nova conta', ()=>{
        cy.get(loc.highlightButton).click()
    })

    it('tentando prosseguir sem digitar o nome', ()=>{
        cy.get(loc.asideButton).click()
        cy.assertMessage('nome')
    })

    it('tentando prosseguir com um nome inválido', ()=>{
        cy.get(loc.userName).type(`${userTest.wrongName}{enter}`)
        cy.assertMessage('nome')
    })

    it('prosseguindo com o nome e senha corretos, e finalizando login', ()=>{
        cy.get(loc.userName).type(`{selectAll}${userTest.newName}{enter}`)
        cy.get(loc.newUserPass).type(`${userTest.newPassword}{enter}`)
    })

    it('finalizando login', ()=>{
        cy.assertLogin({ email: userTest.newEmail, name: userTest.newName })
    })

    it('verificando persistência do login no reload', ()=>{
        cy.reload()
        cy.assertLogin({ email: userTest.newEmail, name: userTest.newName })
    })
})

describe('recuperando a senha', ()=>{
    before(()=>{
        cy.resetNavigator()
    })

    it('entrando no fluxo de recuperação de senha', ()=>{
        cy.get(loc.userRecover).should('contain', 'Esqueceu sua senha?').click()
        cy.get(loc.userRecover).should('contain', 'Voltar ao login normal')

        cy.get(loc.messageRecover).should(
            'contain',
            'precisamos saber seu email:'
        )
    })

    it('voltando ao fluxo normal de login, e depois retornando à recuperação de senha', ()=>{
        cy.get(loc.userRecover).click()
        cy.get(loc.userRecover).should('contain', 'Esqueceu sua senha?')
        cy.get(loc.userRecover).click()
    })

    it('inserindo email inexistente', ()=>{
        cy.get(loc.userEmailRecover).type(`${userTest.newEmail}{enter}`)
        cy.assertMessage('email')
    })

    it('inserindo email existente e retornando ao login normal', ()=>{
        cy.get(loc.userEmailRecover).type(`{selectAll}${userTest.email}{enter}`)
        cy.get(loc.highlightButton).should('contain', 'inserir código')
        cy.get(loc.normalButton).should('contain', 'tentar logar de novo...')
        cy.get(loc.normalButton).click()
    })

    it('retornando à recuperação de senha', ()=>{
        cy.get(loc.userRecover).click()
        cy.get(loc.userEmailRecover).should('have.value', userTest.email)
        cy.get(loc.asideButton).click()
    })

    it('tentando seguir com código de recuperação vazio', ()=>{
        cy.get(loc.highlightButton).click()
        cy.get(loc.userRecoverCode).type('{enter}')
        cy.assertMessage('código de recuperação')
    })

    it('tentando seguir com código de recuperação incorreto', ()=>{
        cy.window().its('localStorage').invoke('setItem', STORAGE_RECOVER, userTest.recoverCode)
        cy.get(loc.userRecoverCode).type(`${userTest.wrongRecoverCode}{enter}`)
        cy.window().its('localStorage').invoke('getItem',STORAGE_RECOVER).should('equal', userTest.recoverCode)
    })

    it('inserindo o código de recuperação de senha correto', ()=>{
        cy.window().its('localStorage').invoke('setItem', STORAGE_RECOVER, userTest.recoverCode)
        cy.get(loc.userRecoverCode).type(`{selectAll}${userTest.recoverCode}{enter}`)
    })

    it('finalizando recuperação de senha', ()=>{
        cy.assertLogin({ email: userTest.email, name: userTest.name })
    })

    it('verificando persistência do login no reload', ()=>{
        cy.reload()
        cy.assertLogin({ email: userTest.email, name: userTest.name })
    })
})