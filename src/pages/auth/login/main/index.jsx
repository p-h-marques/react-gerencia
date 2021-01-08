import React from 'react'
import {MainStyles} from './styles'

import Error from '../../../../assets/auth/icon-error.svg'

const mainInfos = [
    'mínimo de 8 dígitos',
    'precisa conter letras e números'
]

const Main = () => {
    return (
        <MainStyles>
            <h1>Vamos escolher sua futura senha?</h1>
            <input type="email" name="email"
                placeholder="digite aqui sua senha, por favor!"></input>
            <div className="messages">
                {mainInfos.map(info => {
                    return (
                        <div className="message">
                            <img src={Error} alt="Erro"></img>
                            <span>{info}</span>
                        </div>
                    )
                })}
            </div>
        </MainStyles>
    )
}

export default Main