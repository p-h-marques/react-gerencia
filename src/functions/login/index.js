import * as actions from '../../store/actions'

export function handleKeyPress(ev, dispatch){
    if(ev.key === 'Enter') handleValidateEmail(dispatch, ev.target.value)
}

export function handleValidateEmail(dispatch, email){
    let out =  actions.validateEmail(dispatch, email)

    if(!out){
        actions.handleFeedback(dispatch, [{
            type: 'error',
            description: 'esse email parece inválido, que tal tentar novamente?'
        }])
    } else {
        actions.handleFeedback(dispatch, [])
    }
}