import * as authTypes from './types'
import {initialState} from './Provider'

import * as authFunctions from '../../functions/auth'

function reducer(state, action){
    switch(action.type){
        case authTypes.REFRESH:
            return {...initialState}

        case authTypes.SIMPLE_UPDATE:
            return {...state, ...action.payload}

        case authTypes.WELCOME:
            return { ...action.payload }

        case authTypes.UPDATE_USER:
            return {
                ...state,
                user: {...state.user, ...action.payload}
            }

        case authTypes.RESET_USER:
            return {
                ...initialState,
                ...action.payload
            }

        case authTypes.SAVE_SESSION:
            sessionStorage.setItem(
                authFunctions.STORAGE_SESSION,
                JSON.stringify(state)
            )

            return {...state}

        default:
            throw new Error()
    }
}

export default reducer