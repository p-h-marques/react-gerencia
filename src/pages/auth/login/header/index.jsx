import React from 'react'
import {HeaderStyles} from './styles'
import UserInfo from './UserInfo'

import Logo from '../../../../assets/auth/logo-horizontal-cores.svg'

const Header = () => {
    const headerClass = '' ?? ' border'

    return (
        <HeaderStyles>
            <img src={Logo} alt="Gerencia"></img>

            <div className={`infos${headerClass}`}>
                {
                    (<UserInfo title='título' description='descrição' key={0}/>)
                }
            </div>
        </HeaderStyles>
    )
}

export default Header