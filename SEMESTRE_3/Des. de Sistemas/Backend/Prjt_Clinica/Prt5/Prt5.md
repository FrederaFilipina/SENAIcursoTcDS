# Projeto Clinica: Criando o mecanismo de acesso e autenticação

## Arquivo descrevendo e explicando a construção desta etapa do projeto


### ▷ Alterando o prazo de validade do TokenRefresh
1. Acesse o arquivo: `jwt.js` dentro da subpasta `utils`;

2. Altere em `expiresIn` de 24h para 30Days, o `singTokenRefresh`;

### ▷ Adicionando as Chaves de Acesso na variavel de exportação
1. Abra o arquivo `.env` e copie a chave de acesso;

2. Abra o arquivo `env.ts` e cole dentro das "";

### ▷ Criando o endpoit de login
1. Abra o arquivo `env.ts`

2. Crie o endpoint de login Usando o método `POST` para fazer a requisição de acesso;
    1. Crie uma variavel de verificação por email;
    2. Crie a lógica para se exixtir o email no Banco de Dados, os token de acesso e refresh são gerados e armazenados no Banco de Dados;
    3. Crie duas variaveis de expiração dos tokens;