import React, {useContext, useState} from 'react'
import {MainStyles} from './styles'
import Feedback from './Feedback'
import Button from './Button'

import LoginContext from '../../../../store/context/LoginContext'
import * as functions from '../../../../functions/login'

const Main = () => {
    const {state, dispatch} = useContext(LoginContext)
    const [email, setEmail] = useState('')

    return (
        <MainStyles>
            {
                //case inicial
                state.email == '' && (
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
                (state.email != '' && state.name == '') && (
                    <>
                        <h1>
                            Parece que você é novo por aqui...<br />
                            Gostaria de criar uma conta com a gente?
                        </h1>
                        <div className="buttons">
                            <Button highlight={true} label="sim, vamos lá!" />
                            <Button highlight={false} label="quero tentar outro email.." />
                        </div>
                    </>
                )
            }
            {
                //email válido e encontrado
                (state.email != '' && state.name != '') && (
                    <h1>{state.name}</h1>
                )
            }

        </MainStyles>
    )
    // return (
    //     <MainStyles>
    //         <h1>
    //             Parece que você é novo por aqui...<br />
    //             Gostaria de criar uma conta com a gente?
    //         </h1>
    //         <div className="buttons">
    //             <Button highlight={true} label="sim, vamos lá!" />
    //             <Button highlight={false} label="quero tentar outro email.." />
    //         </div>
    //     </MainStyles>
    // )
}

export default Main