import * as authTypes from './types'

function reducer(state, action){
    switch(action.type){

    case authTypes.SIMPLE_UPDATE:
        return {...state, ...action.payload}

    case authTypes.WELCOME:
        return { ...action.payload }

    default:
        throw new Error()
    }
}

export default reducer