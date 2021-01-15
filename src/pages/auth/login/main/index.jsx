import React from 'react'
import {MainStyles} from './styles'
import Feedback from './Feedback'
import Button from './Button'

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
                    return (<Feedback info={info} />)
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
    //             <Button highlight={true} label="sim, vamos lá!" />
    //             <Button highlight={false} label="quero tentar outro email.." />
    //         </div>
    //     </MainStyles>
    // )
}

export default Main