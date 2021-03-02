Projeto pessoal de gerenciador financeiro

Tela de login criada no Figma (link) por mim mesmo

Login, cadastro, recuperação e redefinição de senha mesclados em um mesmo fluxo

Estado global de autenticação consiste em steps

- 0. aguardando primeira inserção de email
- 1. usuário cadastrado inserindo senha
- 2. perguntando sobre cadastrar ou tentar outro email
- 3. inserindo nome
- 4. inserindo senha
- 5. login bem sucedido
- 6. coletando email para envio de código de recuperação
- 7. confirmando envio do código de recuperação
- 8. inserindo e validando código de recuperação

Objeto do estado global

```js
{
  "actualStep": 0,
  "user": {
    "email": '',
    "name": '',
    "pass": '',
    "recoverCode": ""
  },
  "feedbacks": [],
  "loading": false
}
```

Funções notáveis

```js
const handleEnterKeyPress = useCallback(
  (e, f, info) => {
    if(e.key === 'Enter'){
      f(info, dispatchToAuth)
    }
  }
)
```

```js
async function fetchUser(email, dispatchAuth){
  dispatchAuth(authActions.simpleUpdate({
    loading: true
  }))

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  let errorRequest = false

  const request = await fetch('data/users.json', options)
    .then(resp => resp.json())
    .then(resp => { return resp })
    .catch(() => { errorRequest = true })

  if(errorRequest){
    dispatchAuth(authActions.simpleUpdate({
      feedbacks: ['ocorreu algum erro ao buscar seu email :('],
      loading: false
    }))

    return false
  }

  const result = await request.filter(val => { return val.email == email })

  return result
}
```