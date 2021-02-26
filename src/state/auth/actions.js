import * as authTypes from './types'

export function refreshState(){
    return{
        type: authTypes.REFRESH
    }
}

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
                pass: ''
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

export function updateUser(val, key){
    const obj = {}
    obj[key] = val

    return{
        type: authTypes.UPDATE_USER,
        payload: obj
    }
}

export function resetUser(feedbacks){
    return{
        type: authTypes.RESET_USER,
        payload: {
            feedbacks
        }
    }
}