import * as authTypes from './types'
import {initialState} from './Provider'

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

    default:
        throw new Error()
    }
}

export default reducer