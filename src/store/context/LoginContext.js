import {createContext} from 'react'

export const initialData = {
    email: '',
    password: '',
    name: '',
    loading: false,
    feedbacks: [],
}

const LoginContext = createContext(initialData)

export default LoginContext