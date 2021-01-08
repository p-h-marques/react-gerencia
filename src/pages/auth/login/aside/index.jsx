import React from 'react'
import {AsideStyles} from './styles'

import Arrow from '../../../../assets/auth/arrow.svg'

const Aside = () => {
    return (
        <AsideStyles>
            <img src={Arrow} alt="Confirmar"></img>
        </AsideStyles>
    )
}

export default Aside