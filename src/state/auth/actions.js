import * as authTypes from './types'

export function simpleUpdate(newState){
    //update simples do estado
    return{
        type: authTypes.SIMPLE_UPDATE,
        payload: { ...newState }
    }
}

export function welcomeUser(user){
    //atualiza estado pro step 1 (loggingIn)
    return{
        type: authTypes.WELCOME,
        payload: {
            actualStep: 1,
            user: {
                email: user.email,
                name: user.name,
                pass: btoa(user.password)
            },
            feedbacks: [],
            loading: false
        }
    }
}

export function welcomeGuest(email){
    //atualiza estado pro step 2 (handlingVisitor)
    return{
        type: authTypes.WELCOME,
        payload: {
            actualStep: 2,
            user: {
                email,
                name: '',
                pass: ''
            },
            feedbacks: [],
            loading: false
        }
    }
}