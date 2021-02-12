import React from 'react'
import {ButtonStyles} from './styles'

const Button = ({highlight, label, onClick}) => {
    const classes = highlight ? 'highlight' : ''

    return (
        <ButtonStyles type="button" className={classes} onClick={onClick}>
            {label}
        </ButtonStyles>
    )
}

export default Button