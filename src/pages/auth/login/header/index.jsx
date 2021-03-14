import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../../../state/auth/Context'
import {HeaderStyles} from './styles'
import UserInfo from './UserInfo'

import Logo from '../../../../assets/auth/logo-horizontal-cores.svg'

const Header = () => {
    const { auth } = useContext(AuthContext)
    const [ hasUserInfo, setHasUserInfo ] = useState(false)
    const [ headerClass, setHeaderClass ] = useState('')

    useEffect(()=>{
        setHasUserInfo(auth.user.name !== '' || auth.user.email !== '')
        setHeaderClass(hasUserInfo ? ' border' : '')
    }, [hasUserInfo, auth])

    return (
        <HeaderStyles>
            <img src={Logo} alt="Gerencia"></img>

            <div className={`infos${headerClass}`}>
                {
                    auth.user.email !== '' &&
                        <UserInfo title={'Seu email'} description={auth.user.email} />
                }
                {
                    auth.user.name !== '' &&
                        <UserInfo title={'Seu nome'} description={auth.user.name} />
                }
            </div>
        </HeaderStyles>
    )
}

export default Header