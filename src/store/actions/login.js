import {validateBr} from 'js-brasil'

export function handleFeedback(dispatch, feedback){
    dispatch({
        type: "updateFeedbacks",
        payload: feedback
    });
}

export function updateValue(dispatch, value) {
    handleFeedback(dispatch, [])

    dispatch({
        type: "updateValue",
        payload: value
    });
}

export function validateEmail(dispatch, email){
    const validateEmail = validateBr.email(email)

    if(!validateEmail) return false

    console.log('deu bom papai')

    return true
}