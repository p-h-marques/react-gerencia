import React, { useContext, useCallback } from 'react'
import {AsideStyles} from './styles'
import AuthContext from '../../../../state/auth/Context'
import * as authFunctions from '../../../../functions/auth'

import Arrow from '../../../../assets/auth/arrow.svg'
import Loading from '../../../../assets/auth/loading.svg'

const Aside = () => {
    const { auth, dispatchToAuth } = useContext(AuthContext)

    const handleNextStep = useCallback(
        () => {
            switch (auth.actualStep) {
            case 0:
                authFunctions.handleGuestEmail(auth.user.email, dispatchToAuth)
                break

            default:
                console.log('block')
                break
            }
        },
        [auth],
    )

    return (
        <AsideStyles onClick={handleNextStep}>
            <img src={auth.loading ? Loading : Arrow}
                alt="Confirmar"></img>
        </AsideStyles>
    )
}

export default Aside