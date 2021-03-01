import {validateBr} from 'js-brasil'
import * as authActions from '../state/auth/actions'

async function fetchUser(email, dispatchAuth){
    dispatchAuth(authActions.simpleUpdate({
        loading: true
    }))

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    let errorRequest = false

    const request = await fetch('data/users.json', options)
        .then(resp => resp.json())
        .then(resp => { return resp })
        .catch(() => { errorRequest = true })

    if(errorRequest){
        dispatchAuth(authActions.simpleUpdate({
            feedbacks: ['ocorreu algum erro ao buscar seu email :('],
            loading: false
        }))

        return false
    }

    const result = await request.filter(val => { return val.email == email })

    return result
}

export function handleGuestEmail(email, dispatch){
    if(validateBr.email(email)){

        fetchEmailGuest(email, dispatch)

    } else {

        dispatch(authActions.simpleUpdate({
            feedbacks: ['o seu email parece inválido, que tal tentar novamente?']
        }))

    }
}

export async function fetchEmailGuest(email, dispatch){
    const result = await fetchUser(email, dispatch)

    result.length == 1
        ? dispatch(authActions.welcomeUser(result[0]))
        : dispatch(authActions.welcomeGuest(email))
}

export function handleGuestName(name, dispatch){
    if(name.length > 4){

        dispatch(authActions.simpleUpdate({
            actualStep: 4
        }))

    } else {

        dispatch(authActions.simpleUpdate({
            feedbacks: ['o seu nome precisa ter, no mínimo, 5 caracteres']
        }))

    }
}

export function handleGuestPass(pass, dispatch){
    let feedbacks = []

    //mínimo de 8 dígitos
    if(pass.length < 8){
        feedbacks.push('sua senha precisa conter, no mínimo, 8 caracteres')
    }

    //precisa conter letras e números
    if(pass.search(/(?=.*[a-z])(?=.*[0-9])/) < 0){
        feedbacks.push('sua senha precisa conter letras e números')
    }

    if(feedbacks.length > 0){
        dispatch(authActions.simpleUpdate({
            feedbacks
        }))

        return false
    }

    dispatch(authActions.simpleUpdate({
        actualStep: 5
    }))
}

export async function handleLogin(user, dispatch){

    const result = await fetchUser(user.email, dispatch)

    if(result.length !== 1){
        dispatch(authActions.resetUser(['o seu email não foi encontrado']))

        return false
    }

    const validatePassword = result[0].password === user.pass

    if(validatePassword){

        dispatch(authActions.simpleUpdate({
            actualStep: 5,
            loading: false
        }))

        return true

    } else {
        dispatch(authActions.simpleUpdate({
            feedbacks: ['senha inválida, tente novamente'],
            loading: false
        }))

        return false
    }
}

export async function handleEmailRecover(email, dispatch){
    if(validateBr.email(email)){

        const result = await fetchUser(email, dispatch)

        if(result.length !== 1){
            dispatch(authActions.simpleUpdate({
                feedbacks: ['o seu email não foi encontrado'],
                loading: false
            }))

            return false
        }

        dispatch(authActions.simpleUpdate({
            actualStep: 7
        }))

    } else {

        dispatch(authActions.simpleUpdate({
            feedbacks: ['o seu email parece inválido, que tal tentar novamente?']
        }))

    }
}