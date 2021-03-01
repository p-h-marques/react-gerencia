import React, { useContext, useCallback } from 'react'
import AuthContext from '../../../../state/auth/Context'
import * as authActions from '../../../../state/auth/actions'
import {FooterStyles} from './styles'

const Footer = () => {
    const { auth, dispatchToAuth } = useContext(AuthContext)

    const handleForgotPass = useCallback(
        () => {
            if(auth.actualStep !== 6){
                dispatchToAuth(authActions.simpleUpdate({
                    actualStep: 6,
                    user: {
                        email: '',
                        name: '',
                        pass: ''
                    }
                }))
            }
        },
        [auth],
    )
    return (
        <FooterStyles>
            <span onClick={handleForgotPass}>Esqueceu sua senha?</span>
        </FooterStyles>
    )
}

export default Footer