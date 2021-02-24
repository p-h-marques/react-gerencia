import * as authTypes from './types'

export function fetchEmailGuest(email){
    //buscar email e lidar com retorno
    return{
        type: authTypes.FETCH_EMAIL_GUEST,
        payload: {
            actualStep: 2,
            user: {
                email,
                name: '',
                pass: ''
            }
        }
    }
}