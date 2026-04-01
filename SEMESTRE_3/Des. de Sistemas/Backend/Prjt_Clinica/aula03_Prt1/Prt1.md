# Projeto Clinica: ⇨ Construindo a basedo projeto

## Arquivo descrevendo e explicando a construção desta etapa do projeto


### ▷ Iniciando o projeto em Node.js
1. Crie a pasta do projeto;

2. Crie o arquivo `package.json`:
    1. Abra o terminal referente a pasta criada;

    2. Execute o comando: `npm init -y`;
        - 🔎 O que acontece?
            1. Inicializa um novo projeto Node.js na pasta atual;
            2. Cria automaticamente o arquivo `package.json`. O `-y` responde “sim” para todas as perguntas padrão, então você não precisa preencher nada manualmente, os valores padrão serão assumidos no arquivo criado;

3. Edite o arquivo `package.json`:
    1. Abra o arquivo;

    2. Adicione a instrução: `"type": "module"`, antes de `▷Debug`;
        - 🔎 O que acontece?
            1. Informa ao Node.js que este projeto vai usar ES Modules (ESM) em vez do sistema padrão CommonJS. Isso muda o comportamento de como os arquivos são importados e exportados, deixando mais fácil.
---
### ▷ Instalando as dependências principais
1. No terminal aberto, execute o comando `npm install express dotenv pg @prisma/client @prisma/adapter-pg` para instalar de uma única vez todas essas dependências:
    
    1. `Express` ⇨ é um framework web para que simplifica criação de servidores HTTP, rotas, middlewares, APIs REST, etc;
        - 🔎 O que acontece?
            1. Cria a pasta: `node_modules`
            2. Cria o arquivo: `package-lock.json`
    
    2. `dotenv` ⇨ é uma biblioteca que permite carregar variáveis de ambiente a partir do arquivo: `.env` para `process.env`;
    
    3. `pg (node-postgres)` ⇨ é uma biblioteca que permite conectar, consultar e manipular bancos de dados usando o PostgreSQL, que é o cliente oficial para Node.js;

    4. `Prisma Client` ⇨ é uma biblioteca que permite que seu código JavaScript/TypeScript interaja com o banco de dados usando uma API tipada e segura, sem precisar escrever SQL diretamente;

    5. `@prisma/adapter-pg` ⇨ é um adaptador de driver que faz a ponte entre o Prisma Client e o PostgreSQL para que o banco de dados seja conectado;
---
### ▷ Instalando as dependências em modo desenvolvimento (--save-dev)
- 🔎 O que acontece?
    1. O `--save-dev` informa que as dependências serão usadas apenas na fase de desenvolvimento, não em produção.
    2. As dependências são listadas separadamente, em: `"devDependencies"` no arquivo: `package.json`;

1. No terminal aberto, execute o comando `npm install --save-dev typescript ts-node prisma @types/node @types/express @types/pg` para instalar de uma única vez todas essas dependências:
    
    1. `TypeScript` ⇨ é um superset do JavaScript, ou seja, além de trazer tudo que o JS tem, ele adiciona a tipagem estática e recursos modernos de ESNext;

    2. `ts-node` ⇨ é uma ferramenta do ecossistema TypeScript que permite executar arquivos `.ts` diretamente no Node.js, sem precisar compilá-los manualmente para `.js` antes;

    3. `Prisma` ⇨ é um ORM moderno para Node.js e TypeScript que facilita trabalhar com bancos de dados relacionais e alguns NoSQL;

    4. `@types/node` ⇨ é um pacote de definições de tipagem TypeScript para o Node.js. Ele não contém código executável, mas fornece tipagem e interfaces que permitem ao TypeScript entender as APIs do Node.js;

    5. `@types/express` ⇨ é um pacote de definições de tipagem TypeScript para o Express. Ele permitindo que você use o framework com tipagem completa em TypeScript;

    6. `@types/pg` ⇨ é um pacote que fornece tipagem TypeScript para o pg, que é o driver PostgreSQL usado no Node.js;
---
### ▷ Iniciando o TypeScritp
1. Execute o comando: `npx tsc --init` dentro do terminal aberto
    - 🔎 O que acontece?
        1. Define como o TypeScript vai compilar o código;
        2. Cria o arquivo: `tsconfig.json` é na pasta do projeto;

2. Edite o arquivo criado:
    1. Selecione e `delete` todo o código que veio com o arquivo;

    2. `Cole` esse código:

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
---
### ▷ Iniciando o Prisma
obs.: Se não tiver, instale o PostgreSQL (https://www.postgresql.org/)

1. Execute o comando: `npx prisma init` dentro do terminal aberto;
    - 🔎 O que acontece?
        1. Cria a estrutura básica para começar a usar banco de dados;
        2. Cria a subpasta: "prisma" e dentro o arquivo: `prisma,configure.ts`;
        3. Cria na pasta do projeto o arquivo: `.env`;

2. Edite a `url` dentro de `datasource` no arquivo: `prisma.config.ts`
    1. Substitua por essa: `postgresql://username:password@localhost:5432/mydb?schema=public`
    -  Lembrando de arrumar essas partes:
        1. username ⇨ o mesmo usado no PostgreSQL;
        2. password ⇨ a mesma usada no PostgreSQL;
        3. localhost ⇨ a mesma usada no PostgreSQL;
        4. mydb ⇨ nome do Banco de Dados a usado no PostgreSQL;
---
### ▷ Iniciando o Servidor
1. Crie a subpasta: `src` dentro da pasta principal do projeto;

2. Crie e configure o arquivo: `index.ts`:
    - Importar o Express.js;
    - Crie uma porta onde o servidor vai executar requisições HTTP;
    - Crie um objeto para usar na configuração das rotas, middlewares e iniciar o servidor;
    - Crie rota GET que retorne uma mensagem;
    - Crie um comando para iniciar e permitir que o servidor receba e processe requisições;

3. Crie comando de execução do servidor:
    - Abra o arquivo: `package.json`
    - Dentro de `Script` inclua o comando: `"start": "ts-node src/index.ts"`
