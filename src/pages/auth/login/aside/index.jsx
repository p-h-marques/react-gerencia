import React, {useContext} from 'react'
import {AsideStyles} from './styles'

import LoginContext from '../../../../store/context/LoginContext'
import * as functions from '../../../../functions/login'

import Arrow from '../../../../assets/auth/arrow.svg'

const Aside = () => {
    const {state, dispatch} = useContext(LoginContext)

    return (
        <AsideStyles onClick={ () => { functions.handleValidateEmail(dispatch, state.email) }}>
            <img src={Arrow} alt="Confirmar"></img>
        </AsideStyles>
    )
}

export default Aside