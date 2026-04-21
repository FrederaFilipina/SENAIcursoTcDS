# Projeto Clinica: Separando as rotas

## Arquivo descrevendo e explicando a construção desta etapa do projeto

### ▷ Criando a subpasta da rotas
1. Crie a subpasta `routes` dentro da pasta `src`;

2. Crie os arquivos:
    - `auth.ts` ⇨ para armazenar as rotas de cadastro e login
    - `exames.ts` ⇨ para armazenar as rotas de criação e busca dos exames
    - `usuarios.ts` ⇨ para armazenar as rotas de buscar os usuários

### ▷ Alocando as rotas nos respectivos arquivos
1. Abra cada arquivo criado
    -  Recorte os endpoints referente a cada arquivo do arquivo `index.ts`;
    
    - Cole cada parte nos respectivos arquivos;

2. Crie a variavel de  exportação `[nome do arquivo]Router` em cada arquivo;

3. Subistitua nos endpoits `app` por `[nome do arquivo]Router`;

4. Recrie as importações;
