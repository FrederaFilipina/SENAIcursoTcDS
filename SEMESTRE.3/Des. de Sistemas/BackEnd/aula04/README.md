# Projeto: `Clínica BackEnd`

## Parte: #02

### ▷ Atualizando o arquivo `Package.json` para rodar o projeto usando o modo ES Modules (ESM) nativo do Node.js.:
1. Abra o arquivo

2. Dentro de `Script`, atualize o comando `"start"`
    - de: "ts-node src/index.ts"
    - para: "tsx --watch src/index.ts"
3. Executar esse comando o terminal da pasta do projeto: `npm install tsx --save-dev`


### ▷ Criando a tabela no Banco de Dados
<!-- 1. Configurar o arquivo `schema.prisma` dentro da pasta `prisma`
    1. Criar o a tabela de usuário

            model Usuario {
                id    Int     @id @default(autoincrement())
                email String  @unique
                name  String?
                
                @@map("user")
            }
    
    2. No terminal, executar os comando:
        1. `npx prisma format` ⇨ Para corrigir as indentações, organizar, formatar e padroniza a estrutura
        2. `npx prisma migrate dev --name [nome_alteracao]` ⇨ Executar toda as vez que qualquer ateração na tabela ⇨ `model` for feita -->
        3. `npx prisma generate` ⇨ Executar toda as vez que qualquer ateração for feita no Banco de Dados
        -  isso faz com que a subpasta `generated` seja criada com os respectivos arquivos

### ▷Ajustando a estrutura das pastas
1. Jogar a pasta Prisma para dentro de SRC e a pasta Generate dentro da Pasta Prisma

### ▷ Atualizando o `Prisma` para que sejá criado uma única instância de acesso ao Banco de dados:
1. Criar o arquivo `prisma.ts` dentro da subpasta `prisma`
2. Criar a string de conexão para passar o link: `postgresql://username:password@localhost:5432/clinic?schema=public`
    - lembrando de arrumar essa parte em particular `username:password`
3. Criar a conexao com o `PostGreSQL`
4. Criar o `cliente Prisma`

### ▷ Incluindo novas funcionalidades no sevidor:
1. Abriro arquivo `index.jsx` dentro da pasta `src`

2. Incluir a requição para cadastrar usuários no Banco de Dados
    1. Criar um `endpoint` usando o método `POST`
    2. Adicionar uma função para cadastrar usuários

3. Incluir a requição para mostrar todos os úsuários cadastrados no Banco de Dados
    1. Criar um `endpoint` usando o método `GET`
    2. Adicionar uma função para buscar os usuários cadastrados

### ▷ Interagindo(criando e consultando usuáios) com o Postman:
1. Abra o `Postman`
2. Selecionar
