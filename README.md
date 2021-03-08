# Gerencia! - Seu gerenciador financeiro

Olá! Esse é um pequeno projeto de um futuro gerenciador financeiro, do qual existe apenas o fluxo de login, infelizmente :( ... Porém, ele foi criado com o intuito de estudar algumas tecnologias, organizações e padrões:

- **pixel perfect** produzindo um layout do figma, [acessível aqui](https://www.figma.com/file/QxCeBmFQYjubYwG5P46SvO/gerencia?node-id=0%3A1);
- **styled components** para estilizar as páginas, componentes e afins;
- **react hooks** para viabilizar as dinâmicas internas dos componentes;
- **context api** para viabilizar o estado global de autenticação;
- **eslint & prettier** para manter o padrão de código consistente;
- **testes funcionais com cypress** para certificar que todos os casos de uso estão perfeitos.

## Dinâmicas contempladas

Para esse fluxo de telas, os processos de login, cadastro, recuperação e redefinição de senha foram viabilizados e mesclados em um mesmo fluxo. Como ainda preciso fazer o backend dessa aplicação, forjei as requisições e validações com um arquivo JSON estático, mas em breve isso mudará :D

## Etapas do usuário

Para conseguir mesclar todas essas etapas dentro de apenas uma página, o estado global da aplicação (o qual você vai conseguir ver mais abaixo, com detalhes) tem um parâmetro `actualStep`, o qual define em qual etapa do fluxo o usuário se encontra. Isso permite a navegação entre etapas, e a exibição apropriada dos elementos de cada etapa:

```
- 0. aguardando primeira inserção de email
- 1. usuário cadastrado inserindo senha
- 2. perguntando sobre cadastrar ou tentar outro email
- 3. inserindo nome
- 4. inserindo senha
- 5. login bem sucedido
- 6. coletando email para envio de código de recuperação
- 7. confirmando envio do código de recuperação
- 8. inserindo e validando código de recuperação
```

Com isso, a aplicação inicia com o `actualStep = 0`, e vai evoluindo à medida em que o usuário vai percorrendo o fluxo de uso. Abaixo, temos uma palinha de como é o objeto de estado global:

```json
{
  "actualStep": 0,
  "user": {
    "email": "",
    "name": "",
    "pass": "",
    "recoverCode": ""
  },
  "feedbacks": [],
  "loading": false,
  "nextStep": false
}
```

## Testes funcionais

Utilizei o **Cypress** para testar os fluxos de uso da aplicação, os quais se dividem em três atividades principais:

- logando usuário previamente cadastrado;
- cadastrando novo usuário;
- recuperando a senha de um usuário previamente cadastrado.

E, dentro de cada fluxo, testo todas as possibilidades de idas e vindas do fluxo, cercando qualquer chance de inconsistência.

## Funções notáveis

Durante o desenvolvimento, algumas funções legais foram escritas de forma a otimizar meus scripts e não deixar tudo virar uma bagunça:

>*no primeiro caso, uma função de callback que monitora a digitação dos inputs, e quando o enter é pressionado, uma função personalizada é executada, com a informação desejada e com o dispatch do estado global:*

```js
const handleEnterKeyPress = useCallback(
  (e, f, info) => {
    if(e.key === 'Enter'){
      f(info, dispatchToAuth)
    }
  }
)
```

>*no segundo caso, um pouco mais simples, centralizando as requisições de usuários e retornando a pesquisa pelo email desejado:*

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