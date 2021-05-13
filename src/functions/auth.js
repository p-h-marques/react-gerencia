import {validateBr} from 'js-brasil'
import * as authActions from '../state/auth/actions'

export const STORAGE_RECOVER = 'recover'
export const STORAGE_SESSION = 'session'

const api = 'https://gerencia-api.herokuapp.com/api'
// const api = 'http://127.0.0.1:8000/api/auth/fetch'

//buscando usuário na API
async function fetchUser(email, dispatchAuth){
    dispatchAuth(authActions.simpleUpdate({
        loading: true
    }))

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({email})
    }


    const request = await fetch(api + '/auth/fetch', options)

    if(request.status == 500){
        dispatchAuth(authActions.simpleUpdate({
            feedbacks: ['ocorreu algum erro ao buscar seu email :('],
            loading: false
        }))

        return false
    }

    if(request.status !== 404){
        const response = await request.json()
        dispatchAuth(authActions.welcomeUser(response.data))

        return response
    }

    dispatchAuth(authActions.welcomeGuest(email))

    return request
}

//fazendo código de recuperação e salvando no local storage
function makeRecoverCode(){
    function getRandomNumber(){
        return Math.floor(Math.random() * 10).toString()
    }

    let code = ''

    for (let index = 0; index < 6; index++) {
        code += getRandomNumber()
    }

    localStorage.removeItem(STORAGE_RECOVER)
    localStorage.setItem(STORAGE_RECOVER, code)

    return code
}

//validando senha
function validatePass(pass){
    let feedbacks = []

    //mínimo de 8 dígitos
    if(pass.length < 8){
        feedbacks.push('sua senha precisa conter, no mínimo, 8 caracteres')
    }

    //precisa conter letras e números
    if(pass.search(/(?=.*[a-z])(?=.*[0-9])/) < 0){
        feedbacks.push('sua senha precisa conter letras e números')
    }

    return feedbacks
}

//validando email e consultando API
export function handleGuestEmail(email, dispatch){
    if(validateBr.email(email)){

        fetchUser(email, dispatch)

    } else {

        dispatch(authActions.simpleUpdate({
            feedbacks: ['o seu email parece inválido, que tal tentar novamente?']
        }))

    }
}

//validando nome de usuário
export function handleGuestName(name, dispatch){
    if(name.length > 4){

        dispatch(authActions.simpleUpdate({
            actualStep: 4,
            nextStep: false
        }))

    } else {

        dispatch(authActions.simpleUpdate({
            feedbacks: ['o seu nome precisa ter, no mínimo, 5 caracteres']
        }))

    }
}

//validando senha
export function handleGuestPass(pass, dispatch){
    let feedbacks = validatePass(pass)

    if(feedbacks.length > 0){
        dispatch(authActions.simpleUpdate({
            feedbacks
        }))

        return false
    }

    dispatch(authActions.simpleUpdate({
        actualStep: 5
    }))

    dispatch(authActions.saveSession())
}

//efetuando login
export async function handleLogin(user, dispatch){
    dispatch(authActions.simpleUpdate({
        loading: true
    }))

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            email: user.email,
            password: user.pass
        })
    }

    const request = await fetch(api + '/auth/login', options)

    if(request.status == 500){
        dispatch(authActions.simpleUpdate({
            feedbacks: ['ocorreu algum erro ao efetuar seu login :('],
            loading: false
        }))

        return false
    }

    if(request.status == 401){
        dispatch(authActions.simpleUpdate({
            feedbacks: ['email ou senha inválidos :('],
            loading: false
        }))

        return false
    }

    // const response = await request.json()

    dispatch(authActions.simpleUpdate({
        actualStep: 5,
        loading: false
    }))

    dispatch(authActions.saveSession())

    return true
}

//buscando email de usuário e gerando código de recuperação
export async function handleEmailRecover(email, dispatch){
    if(validateBr.email(email)){

        const result = await fetchUser(email, dispatch)

        if(result.length !== 1){
            dispatch(authActions.simpleUpdate({
                feedbacks: ['o seu email não foi encontrado'],
                loading: false
            }))

            return false
        }

        makeRecoverCode()

        dispatch(authActions.simpleUpdate({
            actualStep: 7,
            user: {
                email,
                name: result[0].name,
                pass: '',
                recoverCode: ''
            },
            loading: false
        }))

    } else {

        dispatch(authActions.simpleUpdate({
            feedbacks: ['o seu email parece inválido, que tal tentar novamente?']
        }))

    }
}

//validando código de recuperação
export function handleRecoverCode(code, dispatch){
    if(code.length !== 6){
        dispatch(authActions.simpleUpdate({
            feedbacks: ['o seu código de recuperação deve conter 6 caracteres'],
            loading: false
        }))

        return false
    }

    const storageCode = localStorage.getItem(STORAGE_RECOVER)

    if(storageCode !== code){
        dispatch(authActions.simpleUpdate({
            feedbacks: ['o seu código de recuperação está incorreto'],
            loading: false
        }))

        return false
    }

    dispatch(authActions.simpleUpdate({
        actualStep: 5,
        loading: false
    }))

    dispatch(authActions.saveSession())
}

//atualizando aside em tempo de digitação
export function handleLiveAsideActivation(user, step, dispatch){
    switch (step) {
        case 0:
        case 6:
            dispatch(authActions.simpleUpdate({
                nextStep: validateBr.email(user.email)
            }))
            break

        case 1:
        case 4:
            dispatch(authActions.simpleUpdate({
                nextStep: validatePass(user.pass).length === 0
            }))
            break

        case 3:
            dispatch(authActions.simpleUpdate({
                nextStep: user.name.length > 4
            }))
            break

        case 8:
            dispatch(authActions.simpleUpdate({
                nextStep: user.recoverCode.length === 6
            }))
            break

        default:
            break
    }
}