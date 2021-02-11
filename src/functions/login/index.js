import * as actions from '../../store/actions'

export function handleKeyPress(ev, dispatch){
    if(ev.key === 'Enter'){
        handleValidateEmail(dispatch, ev.target.value)
    } else {
        actions.handleFeedback(dispatch, [])
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