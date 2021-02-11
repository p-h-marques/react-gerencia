export default function reducer(state, action){
    switch (action.type) {
    case 'updateValue':
        return { ...state, email: action.payload}

    case 'updateFeedbacks':
        return { ...state, feedbacks: action.payload}

    default:
        return state
    }
}