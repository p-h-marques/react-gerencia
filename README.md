Projeto pessoal de gerenciador financeiro

Tela de login criada no Figma (link) por mim mesmo

Login, cadastro, recuperação e redefinição de senha mesclados em um mesmo fluxo

Estado global de autenticação consiste em steps

- 0. aguardando primeira inserção de email
- 1. usuário cadastrado inserindo senha
- 2. perguntando sobre cadastrar ou tentar outro email
- 3. inserindo nome
- 4. inserindo senha

Objeto do estado global

```js
{
  "actualStep": 0,
  "user": {
    "email": '',
    "name": '',
    "pass": '',
  },
  "feedbacks": [],
  "loading": false
}
```