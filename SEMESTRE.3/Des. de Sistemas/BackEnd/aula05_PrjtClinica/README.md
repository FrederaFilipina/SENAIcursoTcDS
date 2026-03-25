# Projeto: `Clínica BackEnd`

## Parte: #03

### ▷Adicionando tabela no Banco de Dados:
-  Obs.: Certifique-se que o 
    1. PostgreSQL esteja aberto
    2. O servidor esteja ativo e online (npm start)
    3. O arquivo `prisma.config.ts` e o `prisma.ts` estejam com a `url` da correta
        - postgresql://username:password@localhost:5432/mydb?schema=public

1. Ajuste o `output` no `generator client`
    - de: ../src/generated/prisma
    - para: ../prisma/generated/prisma
2. Alter o nome da tabela Usuário no Banco de dados
    - no @@map("")
        - de: user
        - para: usuario

3. Abrir o arquivo `schema.prisma` dentro da pasta `prisma`
    1. Criar a tabela de exames

            model Exame {
                id         Int      @id @default(autoincrement())
                tipo_exame String
                valor      Decimal
                descricao  String
                resultado  String
                data_exame DateTime
                
                @@map("exame")
            }
    
    2. No terminal, executar os comando:
            1. `npx prisma format` ⇨ Para corrigir as indentações, organizar, formatar e padroniza a estrutura
            2. `npx prisma migrate dev --name [nome_alteracao]` ⇨ Executar toda as vez que qualquer ateração na tabela ⇨ `model` for feita
            3. `npx prisma generate` ⇨ Executar toda as vez que qualquer ateração for feita no Banco de Dados
            -  isso faz com que a subpasta `generated` seja criada com os respectivos arquivos
            4. `npx prisma migrate reset` ⇨ Deleta tudo e reinicia o Banco de dados do Zero

### ▷ Incluindo novas funcionalidades no sevidor:
1. Abriro arquivo `index.jsx` dentro da pasta `src`

2. Para usuários:
    1. Criar um `endpoint` usando o método `PUT` para atualizar os dados de um usuário

    2. Criar um `endpoint` usando o método `GET` para buscar um único usuário pelo ID

    3. Criar um `endpoint` usando o método `DELETE` para deletar um único usuário pelo ID

3. Para exames:

    1. Criar um `endpoint` usando o método `POST` para cadastrar um novo exame

    2. Criar um `endpoint` usando o método `PUT` para atualizar um exame

    3. Criar um `endpoint` usando o método `GET` para listar os exames cadastrados

    3. Criar um `endpoint` usando o método `GET` para buscar um único exame pelo ID

    4. Criar um `endpoint` usando o método `DELETE` para deletar um único exame pelo ID
