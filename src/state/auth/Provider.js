import React, { useReducer } from 'react'
import AuthContext from './Context'
import authReducer from './reducers'
import * as authFunctions from '../../functions/auth'

export const initialState = {
    'actualStep': 0,
    'user': {
        'email': '',
        'name': '',
        'pass': '',
        'recoverCode': ''
    },
    'feedbacks': [],
    'loading': false,
    'nextStep': false
}

function fetchSessionStorage(defaultState){
    const fetchedState = sessionStorage.getItem(authFunctions.STORAGE_SESSION)

    return fetchedState
        ? JSON.parse(fetchedState)
        : defaultState
}

function Provider({ children }) {
    const [auth, dispatchToAuth] = useReducer(
        authReducer,
        initialState,
        fetchSessionStorage
    )

    return (
        <AuthContext.Provider value={{ auth, dispatchToAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default Provider