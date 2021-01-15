import {createContext} from 'react'

export const initialData = {
    email: '',
    password: '',
    name: ''
}

const LoginContext = createContext(initialData)

export default LoginContext;