import React, {useContext} from 'react'
import {MainStyles} from './styles'
// import Feedback from './Feedback'
// import Button from './Button'

import LoginContext from '../../../../store/context/LoginContext'
import {updateValue} from '../../../../store/actions'

const mainInfos = [
    'mínimo de 8 dígitos',
    'precisa conter letras e números'
]

const Main = () => {
    const {state, dispatch} = useContext(LoginContext)

    return (
        <MainStyles>
            <h1>Olá! Digite seu melhor email:</h1>
            <input type="email" name="email"
                placeholder="exemplo@dominio.com.br"
                value={state.email}
                onChange={(e)=>{ updateValue(dispatch, e.target.value) }}>
            </input>
            {/* <div className="messages">
                {mainInfos.map(info => {
                    return (<Feedback info={info} />)
                })}
            </div> */}
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