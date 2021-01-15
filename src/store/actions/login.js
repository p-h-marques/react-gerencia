export function updateValue(dispatch, value) {
    console.log('olá, nova organização!')

    dispatch({
        type: "updateValue",
        payload: value
    });
}
