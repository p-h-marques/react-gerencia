import React, {useContext, useState, useCallback} from 'react'
import {MainStyles} from './styles'
import Feedback from './Feedback'
import Button from './Button'

import LoginContext from '../../../../store/context/LoginContext'
import * as functions from '../../../../functions/login'

const Main = () => {
    const {state, dispatch}     = useContext(LoginContext)
    const [email, setEmail]     = useState('')
    const [name, setName]       = useState('')
    const [newUser, setNewUser] = useState(false)

    const handleTryAgain = useCallback(()=>{
        dispatch({type: 'resetUser'})
        setEmail('')
    }, [state, email])

    const handleNewUser = useCallback(()=>{
        setNewUser('name')
    }, [state])

    const handleEditName = useCallback(e =>{
        let verify = functions.handleNameKeyPress(e, dispatch)

        if(verify) setNewUser('password')
    }, [state, email, name])

    return (
        <MainStyles>
            {
                //case inicial
                (state.email == '' && !newUser) && (
                    <>
                        <h1>Olá! Digite seu melhor email:</h1>
                        <input type="email" name="email" id="email"
                            placeholder="exemplo@dominio.com.br"
                            value={email}
                            onChange={(e)=>{ setEmail(e.target.value) }}
                            onKeyDown={(e)=>{ functions.handleKeyPress(e, dispatch) }}>
                        </input>
                        <div className="messages">
                            {
                                state.feedbacks.map(({description}) => {
                                    return (<Feedback info={description} key={description}/>)
                                })
                            }
                        </div>
                    </>
                )
            }
            {
                //email válido, mas não encontrado
                (state.email != '' && state.name == '' && !newUser) && (
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
                )
            }
            {
                //email válido e encontrado
                (state.email != '' && state.name != '' && !newUser) && (
                    <h1>{state.name}</h1>
                )
            }
            {
                //definindo novo usuário
                (newUser == 'name') && (
                    <>
                        <h1>Vamos nos conhecer melhor?</h1>
                        <input type="text" name="name" id="name"
                            placeholder="digite aqui seu nome, por favor!"
                            value={name}
                            onChange={(e)=>{ setName(e.target.value) }}
                            onKeyDown={(e)=>{ handleEditName(e) }}>
                        </input>
                        <div className="messages">
                            {
                                state.feedbacks.map(({description}) => {
                                    return (<Feedback info={description} key={description}/>)
                                })
                            }
                        </div>
                    </>
                )
            }
            {
                //definindo novo usuário
                (newUser == 'password') && (
                    <h1>Oi {state.name}, {name}!</h1>
                )
            }

        </MainStyles>
    )
}

export default Main