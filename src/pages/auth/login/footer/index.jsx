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
                        email: auth.user.email,
                        name: '',
                        pass: '',
                        recoverCode: ''
                    },
                    feedbacks: []
                }))
            }
        },
        [auth],
    )

    const handleBackToLogin = useCallback(
        () => {
            if(auth.actualStep === 6){
                dispatchToAuth(authActions.simpleUpdate({
                    actualStep: 0,
                    user: {
                        email: auth.user.email,
                        name: '',
                        pass: '',
                        recoverCode: ''
                    },
                    feedbacks: []
                }))
            }
        },
        [auth],
    )
    return (
        <FooterStyles>
            {
                auth.actualStep !== 6
                    ? (<span onClick={handleForgotPass}>Esqueceu sua senha?</span>)
                    : (<span onClick={handleBackToLogin}>Voltar ao login normal</span>)
            }
        </FooterStyles>
    )
}

export default Footer