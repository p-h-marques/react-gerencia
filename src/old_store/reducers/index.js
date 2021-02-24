import {initialData} from '../context/LoginContext'

export default function reducer(state, action){
    switch (action.type) {

    case 'updateFeedbacks':
        return { ...state, feedbacks: action.payload}

    case 'updateLoading':
        return { ...state, loading: action.payload}

    case 'updateUser':
        return { ...state, ...action.payload}

    case 'updateEmail':
        return { ...state, email: action.payload}

    case 'resetUser':
        return { ...initialData }

    default:
        return state
    }
}