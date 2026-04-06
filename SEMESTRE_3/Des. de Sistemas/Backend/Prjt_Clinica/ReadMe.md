# Anotações Gerais do Projeto: Clinica

## Organização e descrição das pastas:

### `Prt1` ⇨ Construindo a basedo projeto
- Iniciando o projeto em Node.js;
- Instalando as dependências principais;
- Instalando as dependências em modo desenvolvimento (--save-dev);
- Iniciando o TypeScritp;
- Iniciando o Prisma;
- Iniciando o Servidor;
---

### `Prt2` ⇨ Criando o Banco de Dados, as tabelas e endpoints
- Reorganizar a estrutura base do projeto;
- Criando as tabelas (Usuário e Exame) e o Banco de Dados de usuário no PostgreSQL;
- Criado uma única instância de acesso ao Banco de dados;
- Criando os endpoints no servidor;
- Populando usuários e exames pelo Postman;
---

### `Prt3` ⇨ Adicionando o Hash de cripitografia e Token de acesso
- Intalando a depedência `bcrypt`
- Criando o arquivo Hash
- Atualizando a tabela(model) de Usuário e criando a tabela Token
- Crie o Token de acesso
- Atualizando o endpoit de criação de usuário
---

### `Prt4` ⇨ Adicionando o Middleware
- Crie as chaves de acesso e refresh
- Associando as chaves ao token
- Crie o Middleware
---

### `Prt5`