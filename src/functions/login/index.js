import * as actions from '../../store/actions'

export function handleKeyPress(ev, dispatch){
    if(ev.key === 'Enter'){
        handleValidateEmail(dispatch, ev.target.value)
    } else {
        actions.handleFeedback(dispatch, [])
    }
}

//resolver duplicidade
export function handleNameKeyPress(ev, dispatch){
    if(ev.key === 'Enter'){
        let isNameValid = actions.validateName(ev.target.value)

        if(!isNameValid){
            actions.handleFeedback(dispatch, [{
                type: 'error',
                description: 'Seu nome precisa conter, no mínimo, 6 caracteres.'
            }])
        } else {
            dispatch({
                type: 'updateUser',
                payload: {name: ev.target.value}
            })
        }

        return isNameValid
    } else {
        actions.handleFeedback(dispatch, [])

        return false
    }
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
            .then(()=>{
                actions.handleEmailRequest(dispatch, email)
            })
    }
}

export function makeHeaderInfos(state){
    const keys = {
        email: 'Seu email:',
        name: 'Seu nome:'
    }

    let result = []

    for(let key in keys){
        if(state[key] != ''){
            result.push({
                title: keys[key],
                description: state[key]
            })
        }
    }

    return result
}