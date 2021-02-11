import {createContext} from 'react'

export const initialData = {
    email: '',
    password: '',
    name: '',
    feedbacks: []
}

const LoginContext = createContext(initialData)

export default LoginContext