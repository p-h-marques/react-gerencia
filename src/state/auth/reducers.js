import * as authTypes from './types'

function reducer(state, action){
    switch(action.type){
    case authTypes.FETCH_EMAIL_GUEST:
        return {...state, ...action.payload}
    default:
        throw new Error()
    }
}

export default reducer