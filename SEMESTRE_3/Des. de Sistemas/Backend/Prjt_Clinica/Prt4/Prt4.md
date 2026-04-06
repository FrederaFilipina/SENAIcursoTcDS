# Projeto Clinica: Adicionando o Middleware

## Arquivo descrevendo e explicando a construção desta etapa do projeto


### ▷ Crie as chaves de acesso e refresh
1. Abra o arquivo: `.env`

    1. Crie as chaves:
        - Chave de Acesso;

        - Chave de Refresh;

2. Crie o arquivo: `env.ts` dentro da pasta: `src`

    1. Crie uma variavel de exportação com as chaves de Acesso e Refresh;
---
### ▷ Associando as chaves ao token
1. Crie o arquivo: `jwt.ts` na subpasta: `utils`
    1. Importe o `jwt` e o `env`;
    2. Crie funções para o token de acesso e o de refresh com um tempo de duração;
    3. Crie funções de verificação para o token de acesso e o de refrsh;
    4. Crie uma função para ler e retornar o token
---
### ▷ Crie o Middleware
1. Crie a subpasta: `middleware` dentro da pasta `src`

2. Crie o arquivo: `auth.ts`
    1. Importe o token de acesso;
    2. Importe: `Response, Request e NextFuncion`
    3. Crie uma função de autenticação
        - com uma variavel `header` para conectar com o Postman
        - com uma verificação, para se estiver correto, prosegir com a requisição
