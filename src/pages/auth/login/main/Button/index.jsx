import React from 'react'
import {ButtonStyles} from './styles'

const Button = ({highlight, label, onClick}) => {
    const classes = highlight ? 'highlight' : ''
    const test = highlight ? 'highlightButton' : 'normalButton'

    return (
        <ButtonStyles type="button" className={classes} onClick={onClick} data-test={test}>
            {label}
        </ButtonStyles>
    )
}

export default Button