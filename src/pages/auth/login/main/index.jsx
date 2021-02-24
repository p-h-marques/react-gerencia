import React from 'react'
import {MainStyles} from './styles'
import Feedback from './Feedback'
// import Button from './Button'

const Main = () => {

    return (
        <MainStyles>
            <h1>Olá! Digite seu melhor email:</h1>
            <input type="email" name="email" id="email"
                placeholder="exemplo@dominio.com.br">
            </input>
            <div className="messages">
                {
                    (<Feedback info={'cuidado ein'} key={0}/>)
                }
            </div>
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