import {validateBr} from 'js-brasil'

export async function handleFeedback(dispatch, feedback){
    dispatch({
        type: 'updateFeedbacks',
        payload: feedback
    })

    return true
}

export function validateEmail(dispatch, email){
    const validateEmail = validateBr.email(email)

    if(!validateEmail) return false

    return true
}

export function validateName(name){
    return name.length > 5
}

export async function handleEmailRequest(dispatch, email){
    dispatch({
        type: 'updateLoading',
        payload: true
    })

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    const request = await fetch('data/users.json', options)
        .then(resp => resp.json())
        .then(resp => { return resp })
        .catch(() => {
            handleFeedback(dispatch, [{
                type: 'error',
                description: 'ocorreu um erro ao pesquisar seu email, que tal tentar novamente?'
            }])

            dispatch({
                type: 'updateLoading',
                payload: false
            })
        })

    const result = await request.filter(val => { return val.email == email })

    if(result.length == 1){
        updateUserState(dispatch, result[0])
    } else {
        dispatch({
            type: 'updateEmail',
            payload: email
        })

        dispatch({
            type: 'updateLoading',
            payload: false
        })
    }
}

function updateUserState(dispatch, user){
    delete user.password

    dispatch({
        type: 'updateUser',
        payload: user
    })

    dispatch({
        type: 'updateLoading',
        payload: false
    })
}