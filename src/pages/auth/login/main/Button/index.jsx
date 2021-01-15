import React from 'react'
import {ButtonStyles} from './styles'

const Button = ({highlight, label}) => {
    const classes = highlight ? 'highlight' : ''

    return (
        <ButtonStyles type="button" className={classes}>
            {label}
        </ButtonStyles>
    )
}

export default Button