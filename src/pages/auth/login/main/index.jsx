import React, { useContext, useEffect, useCallback } from 'react'
import AuthContext from '../../../../state/auth/Context'
import * as authActions from '../../../../state/auth/actions'
import * as authFunctions from '../../../../functions/auth'
import {MainStyles} from './styles'
import Feedback from './Feedback'
import Button from './Button'


const Main = () => {
    const { auth, dispatchToAuth } = useContext(AuthContext)

    /*
    useEffect(() => {
        console.log(auth)
    }, [auth])
    */

    useEffect(()=>{
        //botão lateral acompanhando validações
        authFunctions.handleLiveAsideActivation(
            auth.user, auth.actualStep, dispatchToAuth
        )

        //limpando feedbacks quando input for editado
        if(auth.user.email != ''){
            dispatchToAuth(authActions.simpleUpdate({
                feedbacks: []
            }))
        }
    },[auth.user])

    //função genérica para executar algo quando o enter for pressionado nos inputs
    const handleEnterKeyPress = useCallback(
        (e, f, info) => {
            if(e.key === 'Enter'){
                f(info, dispatchToAuth)
            }
        }
    )

    //migrando de steps
    const handleStepChange = useCallback(
        step => {
            dispatchToAuth(authActions.simpleUpdate({
                actualStep: step,
                nextStep: false
            }))
        },
        [auth.actualStep],
    )

    return (
        <MainStyles>
            {
                auth.actualStep === 0 && (
                    <>
                        <h1>Olá! Digite seu melhor email:</h1>
                        <input type="email" name="email" id="email"
                            placeholder="exemplo@dominio.com.br" value={auth.user.email}
                            onChange={  e => {
                                dispatchToAuth(authActions.updateUser(e.target.value, 'email'))
                            }}
                            onKeyPress={ e => {
                                handleEnterKeyPress(
                                    e, authFunctions.handleGuestEmail, auth.user.email
                                )
                            }}
                        >
                        </input>
                    </>
                )
            }
            {
                auth.actualStep === 1 && (
                    <>
                        <h1>Digite sua senha:</h1>
                        <input type="password" name="newpass" id="newpass" autoComplete="off"
                            placeholder="digite aqui sua senha, por favor!" value={auth.user.pass}
                            onChange={ e => {
                                dispatchToAuth(authActions.updateUser(e.target.value, 'pass'))
                            } }
                            onKeyPress={ e => {
                                handleEnterKeyPress(
                                    e, authFunctions.handleLogin, auth.user
                                )
                            }}
                        >
                        </input>
                    </>
                )
            }
            {
                auth.actualStep === 2 && (
                    <>
                        <h1>
                            Parece que você é novo por aqui...<br />
                            Gostaria de criar uma conta com a gente?
                        </h1>
                        <div className="buttons">
                            <Button highlight={true} label="sim, vamos lá!" onClick={()=>{ handleStepChange(3) }}/>
                            <Button highlight={false} label="quero tentar outro email..." onClick={()=>{
                                dispatchToAuth(authActions.refreshState())
                            }}/>
                        </div>
                    </>
                )
            }
            {
                auth.actualStep === 3 && (
                    <>
                        <h1>Vamos nos conhecer melhor?</h1>
                        <input type="text" name="name" id="name"
                            placeholder="digite aqui seu nome, por favor!" value={auth.user.name}
                            onChange={ e => {
                                dispatchToAuth(authActions.updateUser(e.target.value, 'name'))
                            } }
                            onKeyPress={ e => {
                                handleEnterKeyPress(e, authFunctions.handleGuestName, auth.user.name)
                            } }
                        >
                        </input>
                    </>
                )
            }
            {
                auth.actualStep === 4 && (
                    <>
                        <h1>Vamos escolher sua futura senha?</h1>
                        <input type="password" name="pass" id="pass" autoComplete="off"
                            placeholder="digite aqui sua senha, por favor!" value={auth.user.pass}
                            onChange={ e => {
                                dispatchToAuth(authActions.updateUser(e.target.value, 'pass'))
                            } }
                            onKeyPress={ e => {
                                handleEnterKeyPress(e, authFunctions.handleGuestPass, auth.user.pass)
                            } }
                        >
                        </input>
                    </>
                )
            }
            {
                auth.actualStep === 5 && <h1>Bem-vindo, {auth.user.name}!</h1>
            }
            {
                auth.actualStep === 6 && (
                    <>
                        <h1>Para recuperar sua conta,<br />precisamos saber seu email:</h1>
                        <input type="email" name="recoveremail" id="recoveremail"
                            placeholder="exemplo@dominio.com.br" value={auth.user.email}
                            onChange={  e => {
                                dispatchToAuth(authActions.updateUser(e.target.value, 'email'))
                            }  }
                            onKeyPress={ e => {
                                handleEnterKeyPress(e, authFunctions.handleEmailRecover, auth.user.email)
                            } }
                        >
                        </input>
                    </>
                )
            }
            {
                auth.actualStep === 7 && (
                    <>
                        <h1>
                            {auth.user.name}, o código de recuperação foi<br />enviado pro email <strong>{auth.user.email}</strong>!
                        </h1>
                        <div className="buttons">
                            <Button highlight={true} label="inserir código" onClick={()=>{ handleStepChange(8) }}/>
                            <Button highlight={false} label="tentar logar de novo..." onClick={()=>{ handleStepChange(1) }}/>
                        </div>
                    </>
                )
            }
            {
                auth.actualStep === 8 && (
                    <>
                        <h1>Digite aqui o código de recuperação<br />enviado pro seu email:</h1>
                        <input type="email" name="recovercode" id="recovercode"
                            placeholder="000000" value={auth.user.recoverCode}
                            onChange={  e => {
                                dispatchToAuth(authActions.updateUser(e.target.value, 'recoverCode'))
                            } }
                            onKeyPress={ e => {
                                handleEnterKeyPress(e, authFunctions.handleRecoverCode, auth.user.recoverCode)
                            } }
                        >
                        </input>
                    </>
                )
            }
            {
                ![2,5,7].includes(auth.actualStep) && (
                    <div className="messages">
                        {
                            auth.feedbacks.map(feedback => {
                                return (<Feedback info={feedback} key={feedback}/>)
                            })
                        }
                    </div>
                )
            }
        </MainStyles>
    )
}

export default Main