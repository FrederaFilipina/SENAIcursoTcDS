# Projeto: `Clínica BackEnd`

## Parte: #05

# Passo a apasso

## Aula 07 - Token

### ▷ Abrir o orquivo `.env`
1. Criar achave de acesso e refresh

### ▷ Criar na pasta `src` o arquivo `env.ts`
1. Criar a chave de `acesso`
2. Criar a chave `refresh` (usado para quando a chave de acesso expriar e vai funcinar até o mesmo expirar, ai vai precisar da chave de acesso novamente)

### ▷ Criar na pasta `utils` os Token
1. criar arquivo `jwt.ts`
    1. importar `jwt`
    2. importar `env`
    3. criar função para o `token` de acesso e outra função o refresh
        - definir tempo de duração
    4. criar função de verificação para cada token
    5. criar função para devolver ler o token


### ▷ Criar Middleware
1. criar pasta `middleware` dentro da pasta `src`
2. criar arquivo `auth.ts`
    1. importar token de acess0 + res e req do express
    2. criar função de autenticação
        - criar uma variavel de header para conectar com Postman
        - criar uma verificação, se tiver certo ele prosegue com a requisição

---
atv1 atualizar rota de criação do usuário para cadastro
atv2 criar endpoint para login e retorna sucesso e erro quando as credenciais forem invalidas