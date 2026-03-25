# Projeto: `Clínica BackEnd`

## Parte: #01

### ▷ Iniciando projeto Node
1. Criar o arquivo `package.json`:
    1. Criar a pasta do projeto
    2. Abrir o terminal da pasta do projeto
    3. Executar o comando `npm init -y`

2. Editar o arquivo `package.json`:
    1. Abrir o arquivo;
    2. Criar ou editar a instrução `type`
        - deixar assim: `"type": "module",`

### ▷ Instalando as dependências principais:
1. No terminal aberto, execute os comandos:

    1. `npm install express` ⇨ Para criar a pasta `node_modules` e cria o arquivo `package-lock.json`

    2. `npm install dotenv`  ⇨ Para instalar a biblioteca `dotenv`

    3. `npm install pg` ⇨ Para fazer a: conexão direta com o banco PostgreSQL
    
    4. `npm install @prisma/client` ⇨ Para criar o: cliente que vai acessar o banco`

    5. `npm install @prisma/adapter-pg` ⇨ Para integrar: o Prisma com o PostgreSQL

    -  para instalar tudo de uma única vez, execute esse comando:
        - `npm install express dotenv pg @prisma/client @prisma/adapter-pg`

### ▷ Instalando as dependências de desenvolvimento:
1. No terminal aberto, execute os comandos:

    1. `npm install --save-dev typescript` ⇨ Para instalar o TypeScript

    2. `npm install --save-dev ts-node` ⇨ Para instalar o ts-node

    3. `npm install --save-dev prisma` ⇨ Para instalar o Prisma

    4. `npm install --save-dev @types/node` ⇨ Para instalar Tipagens do Node.js

    5. `npm install --save-dev @types/express` ⇨ Para instalar Tipagens do Express

    6. `npm install --save-dev @types/pg` ⇨ Para instalar Tipagens PostgreSQL

    -  para instalar tudo de uma única vez, execute esse comando:
        - `npm install --save-dev typescript ts-node prisma @types/node @types/express @types/pg`
    -  Obs.: da para trocar: `--save-dev` por `-D`

### ▷ Iniciando o TypeScript:
1. No terminal aberto, execute o comando: `npx tsc --init`, isso faz com que o arquivo `tsconfig.json` seja criado

2. Configure como o ``TypeScript`` vai compilar o projeto:

    1. Delete as informações que vêm com o arquivo

    2. Coloque essas informações:
        
            {
            "compilerOptions": {
                "rootDir": "./src",
                "outDir": "./dist",
                "module": "es6",
                "target": "es6",
                "types": [],
                "sourceMap": true,
                "declaration": true,
                "declarationMap": true,
                "noUncheckedIndexedAccess": true,
                "exactOptionalPropertyTypes": true,
                "strict": true,
                "jsx": "react-jsx",
                "verbatimModuleSyntax": true,
                "isolatedModules": true,
                "noUncheckedSideEffectImports": true,
                "moduleDetection": "force",
                "skipLibCheck": true,
                "esModuleInterop": true,
                "skipDefaultLibCheck": true,
                "forceConsistentCasingInFileNames": true,
            },
            "include": ["src/**/*.ts"],
            "exclude": ["node_modules"]
            }
    
    -  Obs.: foi definido que a pasta principal do projeto é a `src`, ou seja, as demais pastas a serem criadas devem ser migradas para dentro de `src`

### ▷ Iniciando o Prisma:
1. No terminal aberto, execute o comando: `npx prisma init`, isso cria o arquivo `.env` e o arquivo `prisma,configure.ts`na pasta do projeto e a pasta `prisma` junto com arquivo `schema.prisma`

2. Configure o arquivo `prisma.config.ts`

    1. Se não tiver, instale e configure o PostgreSQL (https://www.postgresql.org/)

    2. Altere dentro da propriedade `datasource`
        
            de: url: process.env["DATABASE_URL"]
            para: url: 'postgresql://username:password@localhost:5432/mydb?schema=public'
            
            -  lembrando de arrumar essas partes:
                1. username ⇨ nome no PostgreSQL
                2. password ⇨ senha no PostgreSQL
                3. localhost ⇨ porta no PostgreSQL
                4. mydb ⇨ nome do Banco de Dados

### ▷ Criar e configurar um servidor básico:
1. Criar a subpasta `src` dentro da pasta principal do projeto

2. Criar e configurar o arquivo `index.ts`:
    - Importar o Express.js;
    - Criar uma porta onde o servidor vai executar requisições HTTP;
    - Criar um objeto para usar na configuração das rotas, middlewares e iniciar o servidor;
    - Criar rota GET que retorne uma mensagem;
    - Criar um comando para iniciar e permitir que o servidor receba e processe requisições;

3. Criar comando de execução do servidor:
    - Abrir o arquivo `package.json`
    - Dentro de `Script` incluir o comando: `"start": "ts-node src/index.ts"`