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
                        <div className="message" key={info}>
                            <img src={Error} alt="Erro"></img>
                            <span>{info}</span>
                        </div>
                    )
                })}
            </div>
        </MainStyles>
    )
    // return (
    //     <MainStyles>
    //         <h1>
    //             Parece que você é novo por aqui...<br />
    //             Gostaria de criar uma conta com a gente?
    //         </h1>
    //         <div className="buttons">
    //             <button type="button" className="highlight">sim, vamos lá!</button>
    //             <button type="button">quero tentar outro email...</button>
    //         </div>
    //     </MainStyles>
    // )
}

export default Main