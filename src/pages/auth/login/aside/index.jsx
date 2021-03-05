import React, { useContext, useCallback, useState, useEffect } from 'react'
import {AsideStyles} from './styles'
import AuthContext from '../../../../state/auth/Context'
import * as authFunctions from '../../../../functions/auth'
import * as authActions from '../../../../state/auth/actions'

import Arrow from '../../../../assets/auth/arrow.svg'
import Loading from '../../../../assets/auth/loading.svg'
import Waiting from '../../../../assets/auth/waiting.svg'

const Aside = () => {
    const { auth, dispatchToAuth } = useContext(AuthContext)
    const [ status, setStatus ]    = useState(Arrow)

    useEffect(() => {
        //exibindo ícone de carregamento
        auth.loading ? setStatus(Loading) : setStatus(Arrow)

        //exibindo ícone de ?
        !auth.nextStep && !auth.loading ? setStatus(Waiting) : setStatus(Arrow)

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

            case 6:
                authFunctions.handleEmailRecover(auth.user.email, dispatchToAuth)
                break

            case 7:
                dispatchToAuth(authActions.simpleUpdate({
                    actualStep: 8,
                    nextStep: false
                }))
                break

            case 8:
                authFunctions.handleRecoverCode(auth.user.recoverCode, dispatchToAuth)
                break

            default:
                console.log(auth.actualStep)
                break
            }
        },
        [auth],
    )

    return (
        <AsideStyles onClick={handleNextStep} className={!auth.nextStep ? 'disabled' : ''}>
            <img src={status}
                alt="Confirmar"></img>
        </AsideStyles>
    )
}

export default Aside