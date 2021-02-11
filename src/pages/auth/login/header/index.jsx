import React, {useContext, useEffect, useState} from 'react'
import {HeaderStyles} from './styles'
import UserInfo from './UserInfo'

import Logo from '../../../../assets/auth/logo-horizontal-cores.svg'

import LoginContext from '../../../../store/context/LoginContext'
import * as functions from '../../../../functions/login'


const Header = () => {
    const {state} = useContext(LoginContext)
    const [headerInfos, setHeaderInfos] = useState([])

    useEffect(()=>{
        setHeaderInfos(functions.makeHeaderInfos(state))
    }, [state])

    const headerClass = headerInfos.length === 0 ? '' :  ' border'

    return (
        <HeaderStyles>
            <img src={Logo} alt="Gerencia"></img>

            <div className={`infos${headerClass}`}>
                {
                    headerInfos.map(info => {
                        return (<UserInfo title={info.title} description={info.description} key={info.title}/>)
                    })
                }
            </div>
        </HeaderStyles>
    )
}

export default Header