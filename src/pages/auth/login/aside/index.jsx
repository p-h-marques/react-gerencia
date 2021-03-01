import React, { useContext, useCallback, useState, useEffect } from 'react'
import {AsideStyles} from './styles'
import AuthContext from '../../../../state/auth/Context'
import * as authFunctions from '../../../../functions/auth'

import Arrow from '../../../../assets/auth/arrow.svg'
import Loading from '../../../../assets/auth/loading.svg'
import Waiting from '../../../../assets/auth/waiting.svg'

const Aside = () => {
    const { auth, dispatchToAuth } = useContext(AuthContext)
    const [ status, setStatus ]    = useState(Arrow)
    const [ active, setActive ]    = useState(true)

    useEffect(() => {
        auth.loading ? setStatus(Loading) : setStatus(Arrow)

        if(auth.actualStep == 2 || auth.feedbacks.length > 0){
            setStatus(Waiting)
            setActive(false)
        } else {
            setStatus(Arrow)
            setActive(true)
        }
    }, [auth])

    const handleNextStep = useCallback(
        () => {
            switch (auth.actualStep) {
            case 0:
                authFunctions.handleGuestEmail(auth.user.email, dispatchToAuth)
                break

            case 1:
                authFunctions.handleLogin(auth.user, dispatchToAuth)
                break

            case 3:
                authFunctions.handleGuestName(auth.user.name, dispatchToAuth)
                break

            case 4:
                authFunctions.handleGuestPass(auth.user.pass, dispatchToAuth)
                break

            default:
                console.log(auth.actualStep)
                break
            }
        },
        [auth],
    )

    return (
        <AsideStyles onClick={handleNextStep} className={!active ? 'disabled' : ''}>
            <img src={status}
                alt="Confirmar"></img>
        </AsideStyles>
    )
}

export default Aside