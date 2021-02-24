import React, { useReducer } from 'react'
import AuthContext from './Context'
import authReducer from './reducers'

const initialState = {
    'actualStep': 0,
    'user': {
        'email': '',
        'name': '',
        'pass': '',
    },
    'feedbacks': [],
    'loading': false
}

function Provider({ children }) {
    const [auth, dispatchToAuth] = useReducer(authReducer, initialState)
    return (
        <AuthContext.Provider value={{ auth, dispatchToAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default Provider