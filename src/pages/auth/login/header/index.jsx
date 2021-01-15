import React from 'react'
import {HeaderStyles} from './styles'
import UserInfo from './UserInfo'

import Logo from '../../../../assets/auth/logo-horizontal-cores.svg'

const headerInfos = [{
    title: 'Seu email:',
    description: 'pedrohenriquesv@outlook.com'
},{
    title: 'Seu nome:',
    description: 'Pedro Henrique'
}]

const headerClass = headerInfos.length === 0 ? "" :  " border"

const Header = () => {
    return (
        <HeaderStyles>
            <img src={Logo} alt="Gerencia"></img>

            <div className={`infos${headerClass}`}>
                {
                    headerInfos.map(info => {
                        return (<UserInfo title={info.title} description={info.description} />)
                    })
                }
            </div>
        </HeaderStyles>
    )
}

export default Header