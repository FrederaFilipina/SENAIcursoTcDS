# Projeto Clinica: Adicionando o Hash de cripitografia e Token de acesso

## Arquivo descrevendo e explicando a construção desta etapa do projeto


### ▷ Intalando a depedência `bcrypt`
1. Abra o terminal referente a pasta do projeto e execute o comandos:
    - `npm install bcrypt`
        - 🔎 O que acontece?
            1. Instala a biblioteca bcrypt, responsável por criar hash de senha
                -  `Hash de senha`: é o resultado da aplicação de uma função matemática irreversível sobre uma senha, gerando uma sequência única de caracteres

    - `npm install --save-dev @types/bcrypt`
        - 🔎 O que acontece?
            1. Instala um pacote de definições de tipagem TypeScript para o bcrypt. Permitindo o autocomplete e validação de tipos.
---
### ▷ Criando o arquivo Hash
1. Dentro de ´src´ crie a subpasta: `utils` e dentro o arquivo: `createHash.ts`

    1. Faça a importação bcrypt;

    2. Crie a variavel saltRounds;

    3. Crie uma função para criar e exportar o Hash
---
### ▷ Atualizando a tabela(model) de Usuário e criando a tabela Token
-  Obs.: Certifique-se que: 
    1. O PostgreSQL esteja aberto;
    2. O servidor esteja ativo e online (npm start);
    3. O arquivo `prisma.config.ts` estejacom a `url` correta
        - `postgresql://username:password@localhost:5432/mydb?schema=public`

1. Abra o arquivo: `schema.prisma`
    -  Obs.:
        - `npx prisma format` ⇨ Para corrigir as indentações, organizar, formatar e padroniza a estrutura;
        - `npx prisma migrate dev --name [nome do "commit"]` ⇨ Toda as vez que qualquer ateração na tabela (model) for feita;
        - `npx prisma generate` ⇨ Toda as vez que qualquer ateração for feita no Banco de Dados;

2. Adicione a coluna de senha dentro da tabela(model): Usuário


3. Crie a tabela(model): Token
---
### ▷ Crie o Token de acesso
1. Abra o terminal referente a pasta do projeto e execute o comandos:
    - `npm install jsonwebtoken`
        - 🔎 O que acontece?
            1. Permite gerar um token seguro que identifica um usuário após o login.
    
    - `npm install --save-dev @types/jsonwebtoken`
        - 🔎 O que acontece?
            1. Instala um pacote de definições de tipagem TypeScript para o JWT.

2. Crie o arquivo: `token.ts` na pasta: `src`
    1. Importe o JWT;
    2. Crie a variável a chave de acesso;
    3. Crie a variável do token com um tempo de expiração;
    4. Crie uma validação para ocorrer dentro de um tempo;
---
### ▷ Atualizando o endpoit de criação de usuário
1. Crie a variavel Hash

2. Atualize a `data` conforme a tabela(model)