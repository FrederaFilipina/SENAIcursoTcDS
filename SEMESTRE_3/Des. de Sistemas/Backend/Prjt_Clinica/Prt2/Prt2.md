# Projeto Clinica: ⇨ Criando o Banco de Dados, as tabelas e endpoints

## Arquivo descrevendo e explicando a construção desta etapa do projeto


### ▷ Reorganizar a estrutura base do projeto
1. Copie a pasta: `prisma` e cole dentro da pasta: `src`;

2. Edite os arquivos:
    1. `prisma.config.ts` para que o `schema` e `path`, tenha: `src/` no inicio do caminho das pastas;
    2. `schema.prisma` para que no `output` do `generator client` seja trocado: `src` do  por: `prisma`;

3. Abra o terminal referente a pasta do projeto e execute o comando: `npm install tsx --save-dev`;
    1. Edite o arquivo: `package.json` para que a instrução: `start` fique assm: "start": "tsx watch src/index.ts";
        - 🔎 O que acontece?
            1. Ele executa diretamente um arquivo TypeScript `.ts` usando o ts-node, com suporte a módulos ES (--esm).
---
### ▷ Criando as tabelas (Usuário e Exame) e o Banco de Dados de usuário no PostgreSQL
-  Obs.: Certifique-se que: 
    1. O PostgreSQL esteja aberto;
    2. O servidor esteja ativo e online (npm start);
    3. O arquivo `prisma.config.ts` estejacom a `url` correta
        - `postgresql://username:password@localhost:5432/mydb?schema=public`
            1. username ⇨ o mesmo usado no PostgreSQL;
            2. password ⇨ a mesma usada no PostgreSQL;
            3. localhost ⇨ a mesma usada no PostgreSQL;
            4. mydb ⇨ nome do Banco de Dados a usado no PostgreSQL;

1. Abra o arquivo: `schema.prisma`
    1. Crie as tabelas seguindo a estrutura base do model (tabela)

            model [nome da tabela no prisma]{
            [nome da coluna]    [tipo de dado]  [atributos de comportamento]
            [nome da coluna]    [tipo de dado]  [atributos de comportamento]
            [nome da coluna]    [tipo de dado]  [atributos de comportamento]

            @@map("[nome da tabela no Banco de dados]")
            }

            1. Exemplos de tipo de dados:
                - String
                - Int
                - Boolean
                - DateTime
                - Float

            2. Exemplos de atributos de comportamento:
                - @id ⇨ chave primária
                - @default(autoincrement()) ⇨ Auto incremento
                - @default()
                - @unique ⇨ valor único

        - 🔎 O que acontece?
            1. Quando você define o `model` no arquivo: `schema.prisma`, o Prisma converte isso em tabelas no Banco de Dados.
            
    
    2. No terminal da pasta, execute os comandos:
        1. `npx prisma format` ⇨ Para corrigir as indentações, organizar, formatar e padroniza a estrutura

        2. `npx prisma migrate dev --name [nome do "commit"]` ⇨ Executar toda as vez que qualquer ateração na tabela ⇨ `model` for feita
            - 🔎 O que acontece?
                1. Na primeira vez, cria o Banco de Dados com base no nome da `url` do arquivo: `schema.prisma`;
                2. Na primeira vez, cria a subpasta: `mirations` dentro da pasta: `prisma`;
                3. Cria uma subpasta com o nome do "commit", com as alterações feita no Banco do Dados;

        3. `npx prisma generate` ⇨ Executar toda as vez que qualquer ateração for feita no Banco de Dados
            - 🔎 O que acontece?
                1. Gerar o Prisma Client, que é a camada usada no código para acessar o Banco de Dados.
        
        -  Caso precise reinicar o Banco de Dados, apagando todas as tabelas e recriando tudo de novo, user o comando: `npx prisma migrate reset`

### ▷ Criado uma única instância de acesso ao Banco de dados
1. Crie o arquivo `prisma.ts` dentro da subpasta `prisma`

2. Crie a string de conexão para passar o link da url: `postgresql://username:password@localhost:5432/mydb?schema=public`
    -  lembrando de arrumar essas partes:
        1. username ⇨ nome no PostgreSQL
        2. password ⇨ senha no PostgreSQL
        3. localhost ⇨ porta no PostgreSQL
        4. mydb ⇨ nome do Banco de Dados
        
3. Crie a conexao com o `PostGreSQL`

4. Crie a exportação do `cliente Prisma`

### ▷ Criando os endpoints no servidor
1. Abra o arquivo: "index.ts"

2. Crie os endpoints:
    1. Para o usuário:
        1. Use o método `POST` para cadastrar um novo usuário

        2. Use o método `PUT` para atualizar um usuário

        3. Use o método `GET` para listar os usuários cadastrados

        3. Use o método `GET` para buscar um único usuário pelo ID

        4. Use o método `DELETE` para deletar um único usuário pelo ID
    
    2. Para o exame:
        1. Use o método `POST` para cadastrar um novo exame

        2. Use o método `PUT` para atualizar um exame

        3. Use o método `GET` para listar os exames cadastrados

        3. Use o método `GET` para buscar um único exame pelo ID

        4. Use o método `DELETE` para deletar um único exame pelo ID

### ▷ Populando usuários e exames pelo Postman
1. Adicone no `index.ts`
    - app.use(express.json())

2. Abra o Postman(https://www.postman.com/);

3. Crie uma pasta no `collections` para organizar e guarar as requisições;

4. Crie as subpastas para armezenar as requisições de Usuário e Exame;

5. Crie a requisição:
    1. Crie o nome;

    2. Selecione o tipo:
        - Get ⇨ para requerer
        - Post ⇨ para enviar
        - Put ⇨ para atalizar
        - Delete ⇨ para deletar
    
    3. Coloque a url: `http://localhost:3000/` [nome que está no endpoint]

    4. Selecione `Body`
        - Selecione `raw`
        - Selecione `JSON`
    
    5. Escreva o que vai ser feito no Banco de Dados
