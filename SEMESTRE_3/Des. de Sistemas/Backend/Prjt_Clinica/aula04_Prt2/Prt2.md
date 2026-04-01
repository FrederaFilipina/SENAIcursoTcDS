# Projeto Clinica: ⇨ Criando a tabela usuário no PostgreSQL, a rota no servidor e cadastrando usuário

## Arquivo descrevendo e explicando a construção desta etapa do projeto


### ▷ Reorganizar a estrutura base do projeto
1. Copie a pasta: `prisma` e cole dentro da pasta: `src`;

2. Edite o arquivo: `prisma.config.ts` para que o `schema` e `path`, tenha: `src/` no inicio do caminho das pastas;

<!-- 3. Abra o terminal referente a pasta criada e execute o comando: `npm install tsx --save-dev`;
    1. Edite o arquivo: `package.json` para que a instrução: `start` fique assm: "start": "ts-node --esm src/index.ts";
        - 🔎 O que acontece?
            1. Ele executa diretamente um arquivo TypeScript `.ts` usando o ts-node, com suporte a módulos ES (--esm).
--- -->
### ▷ Criando as tabelas e o Banco de Dados de usuário no PostgreSQL
-  Obs.: Certifique-se que: 
    1. O PostgreSQL esteja aberto;
    2. O servidor esteja ativo e online (npm start);
    3. O arquivo `prisma.config.ts` estejacom a `url` correta
        - `postgresql://username:password@localhost:5432/mydb?schema=public`
            1. username ⇨ o mesmo usado no PostgreSQL;
            2. password ⇨ a mesma usada no PostgreSQL;
            3. localhost ⇨ a mesma usada no PostgreSQL;
            4. mydb ⇨ nome do Banco de Dados a usado no PostgreSQL;

1. Abrir o arquivo: `schema.prisma`