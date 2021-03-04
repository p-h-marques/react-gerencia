import React, { useContext, useEffect, useCallback } from 'react'
import AuthContext from '../../../../state/auth/Context'
import * as authActions from '../../../../state/auth/actions'
import * as authFunctions from '../../../../functions/auth'
import {MainStyles} from './styles'
import Feedback from './Feedback'
import Button from './Button'


const Main = () => {
    const { auth, dispatchToAuth } = useContext(AuthContext)

    //debug do estado

    useEffect(()=>{
        authFunctions.handleLiveAsideActivation(
            auth.user, auth.actualStep, dispatchToAuth
        )
    },[auth.user])


    //limpando erros quando inputs mudam
    useEffect(()=>{
        if(auth.user.email != ''){
            dispatchToAuth(authActions.simpleUpdate({
                feedbacks: []
            }))
        }
    },[auth.user])

    //lidando com alterações no formulário do usuário
    const handleUserChange = useCallback(
        (e, param) => {
            dispatchToAuth(authActions.updateUser(e.target.value, param))
        },
        [auth.user],
    )

    //função genérica para executar algo quando o enter for pressionado nos inputs
    const handleEnterKeyPress = useCallback(
        (e, f, info) => {
            if(e.key === 'Enter'){
                f(info, dispatchToAuth)
            }
        }
    )

    //retornando ao step inicial
    const handleInitialStep = useCallback(
        () => {
            dispatchToAuth(authActions.refreshState())
        },
        [auth],
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
                                handleUserChange(e, 'email')

                                // authFunctions.handleLiveAsideActivation(
                                //     auth.user.email, 'email', dispatchToAuth
                                // )
                            }}
                            onKeyPress={ e => {
                                handleEnterKeyPress(
                                    e, authFunctions.handleGuestEmail, auth.user.email
                                )
                            }}
                        >
                        </input>
                        <div className="messages">
                            {
                                auth.feedbacks.map(feedback => {
                                    return (<Feedback info={feedback} key={feedback}/>)
                                })
                            }
                        </div>
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
                                handleUserChange(e, 'pass')

                                // authFunctions.handleLiveAsideActivation(
                                //     auth.user.pass, 'pass', dispatchToAuth
                                // )
                            } }
                            onKeyPress={ e => {
                                handleEnterKeyPress(
                                    e, authFunctions.handleLogin, auth.user
                                )
                            }}
                        >
                        </input>
                        <div className="messages">
                            {
                                auth.feedbacks.map(feedback => {
                                    return (<Feedback info={feedback} key={feedback}/>)
                                })
                            }
                        </div>
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
                            <Button highlight={false} label="quero tentar outro email.." onClick={handleInitialStep}/>
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
                            onChange={ e => { handleUserChange(e, 'name') } }
                            onKeyPress={ e => {
                                handleEnterKeyPress(e, authFunctions.handleGuestName, auth.user.name)
                            } }
                        >
                        </input>
                        <div className="messages">
                            {
                                auth.feedbacks.map(feedback => {
                                    return (<Feedback info={feedback} key={feedback}/>)
                                })
                            }
                        </div>
                    </>
                )
            }
            {
                auth.actualStep === 4 && (
                    <>
                        <h1>Vamos escolher sua futura senha?</h1>
                        <input type="password" name="pass" id="pass" autoComplete="off"
                            placeholder="digite aqui sua senha, por favor!" value={auth.user.pass}
                            onChange={ e => { handleUserChange(e, 'pass') } }
                            onKeyPress={ e => {
                                handleEnterKeyPress(e, authFunctions.handleGuestPass, auth.user.pass)
                            } }
                        >
                        </input>
                        <div className="messages">
                            {
                                auth.feedbacks.map(feedback => {
                                    return (<Feedback info={feedback} key={feedback}/>)
                                })
                            }
                        </div>
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
                            onChange={  e => { handleUserChange(e, 'email') }  }
                            onKeyPress={ e => {
                                handleEnterKeyPress(e, authFunctions.handleEmailRecover, auth.user.email)
                            } }
                        >
                        </input>
                        <div className="messages">
                            {
                                auth.feedbacks.map(feedback => {
                                    return (<Feedback info={feedback} key={feedback}/>)
                                })
                            }
                        </div>
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
                            onChange={  e => { handleUserChange(e, 'recoverCode') }  }
                            onKeyPress={ e => {
                                handleEnterKeyPress(e, authFunctions.handleRecoverCode, auth.user.recoverCode)
                            } }
                        >
                        </input>
                        <div className="messages">
                            {
                                auth.feedbacks.map(feedback => {
                                    return (<Feedback info={feedback} key={feedback}/>)
                                })
                            }
                        </div>
                    </>
                )
            }
        </MainStyles>
    )
}

export default Main