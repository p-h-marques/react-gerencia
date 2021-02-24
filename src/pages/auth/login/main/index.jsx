import React, { useContext, useEffect, useCallback } from 'react'
import AuthContext from '../../../../state/auth/Context'
import * as authActions from '../../../../state/auth/actions'
import * as authFunctions from '../../../../functions/auth'
import {MainStyles} from './styles'
import Feedback from './Feedback'
// import Button from './Button'


const Main = () => {
    const { auth, dispatchToAuth } = useContext(AuthContext)

    //debug do estado
    useEffect(()=>{
        console.log(auth)
    },[auth.actualStep])

    //limpando erros quando inputs mudam
    useEffect(()=>{
        dispatchToAuth(authActions.simpleUpdate({
            feedbacks: []
        }))
    },[auth.user])

    //lidando com edição do input de email
    const handleEmailChange = useCallback(
        e => {
            dispatchToAuth(authActions.simpleUpdate({
                user: {
                    email: e.target.value,
                    name: '',
                    pass: ''
                },
            }))
        },
        [auth.user],
    )

    //lidando com ENTER do formulário
    const handleEmailKeyPress = useCallback(
        e => {
            if(e.key === 'Enter'){
                authFunctions.handleGuestEmail(auth.user.email, dispatchToAuth)
            }
        },
        [auth.user],
    )

    return (
        <MainStyles>
            {
                auth.actualStep === 0 && (
                    <>
                        <h1>Olá! Digite seu melhor email:</h1>
                        <input type="email" name="email" id="email"
                            placeholder="exemplo@dominio.com.br" value={auth.email}
                            onChange={ handleEmailChange }
                            onKeyPress={ handleEmailKeyPress }>
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
/*
<>
    <h1>
        Parece que você é novo por aqui...<br />
        Gostaria de criar uma conta com a gente?
    </h1>
    <div className="buttons">
        <Button highlight={true} label="sim, vamos lá!" onClick={handleNewUser}/>
        <Button highlight={false} label="quero tentar outro email.." onClick={handleTryAgain}/>
    </div>
</>
*/