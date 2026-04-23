# Projeto Clinica: Aplicando a arquitetura de camadas para separar cada etapa da rota

## Arquivo descrevendo e explicando a construção desta etapa do projeto


### ▷ Criando as subpastas da arquitetura dentro da pasta `src`
1. Crie as subpastas:
    - controller;
    - repository;
    - services;

### ▷ Criando o arquivo do repositório
(tudo que se refere a interação com o banco de dados)

1. Crie o arquivo `[Nome_da_rota]Repository`

    - Crie um `class` em modo exportação;
    
        1. Dentro do `class` crie o `constructor` e passe a informação da ferramenta do Banco de Dados que está sendo usado
        -  Faça a importação do prisma
        
        2. Dentro do `class` crie as funções `async` com os nomes do que será feito e passe os parametros para a interação com o Banco de dados;

    - Crie a variavel que vai exportar o arquivo em questão;



### ▷ Criando o arquivo do serviço
(tudo que se refere a regras de negócios)

1. Crie o arquivo `[Nome_da_rota]Services`

    - Crie um `class` em modo exportação;

        1. Dentro do `class` crie o `constructor` e passe a informação do `repository` criado para essa rota;
        
        2. Dentro do `class` crie as funções `async` com os mesmo nomes utilizado no arquivo `repository` da rota e passe os parametros dos dados da requição que vão ser passados para o Banco de Dados;

        3. Altere os `await` para receber a referência do próprio arquivo `repository`;
    
    - Crie a variavel que vai exportar o arquivo em questão;




### ▷ Criando o arquivo do controlador
(tudo que se refere a requisições e interações com o frontend)

1. Crie o arquivo `[Nome_da_rota]Controller`