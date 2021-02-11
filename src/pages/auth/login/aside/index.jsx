import React, {useContext, useCallback} from 'react'
import {AsideStyles} from './styles'

import LoginContext from '../../../../store/context/LoginContext'
import * as functions from '../../../../functions/login'

import Arrow from '../../../../assets/auth/arrow.svg'
import Loading from '../../../../assets/auth/loading.svg'

const Aside = () => {
    const {state, dispatch} = useContext(LoginContext)

    const handleArrowClick = useCallback(()=>{
        functions.handleValidateEmail(dispatch, document.getElementById('email').value)
    }, [state])

    return (
        <AsideStyles onClick={handleArrowClick}>
            <img src={state.loading ? Loading : Arrow} alt="Confirmar"></img>
        </AsideStyles>
    )
}

export default Aside