export default function reducer(state, action){
    switch (action.type) {
        case 'updateValue':
            return { ...state, email: action.payload}

        default:
            return state;
    }
}