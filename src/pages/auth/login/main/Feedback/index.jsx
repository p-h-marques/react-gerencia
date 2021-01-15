import React from 'react'
import {FeedbackStyles} from './styles'

import Error from '../../../../../assets/auth/icon-error.svg'

const Feedback = ({info}) => {
    return (
        <FeedbackStyles key={info}>
            <img src={Error} alt="Erro"></img>
            <span>{info}</span>
        </FeedbackStyles>
    )
}

export default Feedback