import {validateBr} from 'js-brasil'
import * as authActions from '../state/auth/actions'

export function handleGuestEmail(email, dispatch){
    if(validateBr.email(email)){

        dispatch(authActions.simpleUpdate({
            loading: true
        }))

        fetchEmailGuest(email, dispatch)

    } else {

        dispatch(authActions.simpleUpdate({
            feedbacks: ['o seu email parece inválido, que tal tentar novamente?']
        }))

    }
}

export async function fetchEmailGuest(email, dispatch){
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
        dispatch(authActions.simpleUpdate({
            feedbacks: ['ocorreu algum erro ao buscar seu email :('],
            loading: false
        }))

        return false
    }

    const result = await request.filter(val => { return val.email == email })

    if(result.length == 1){
        dispatch(authActions.welcomeUser(result[0]))
    } else {
        dispatch(authActions.welcomeGuest(email))
    }
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