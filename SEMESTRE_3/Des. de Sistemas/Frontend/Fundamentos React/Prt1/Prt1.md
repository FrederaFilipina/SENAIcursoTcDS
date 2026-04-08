## `Prt1` ⇨ Componente


### ▷ Preparar os arquivos para iniciar o projeto:
- O que será feito:
    - Deletar os códigos dos arquivos que vêm pronto como exemplo quando se cria projeto no React;
    - Criar o componente padrão que receberá todos os principais componentes do projeto;
    - Definir a estilização padrão que servirá de base para toda estilização dos componentes do projeto;

- Passo a passo:
    1. Abra o arquivo: `App.jsx` (recebe e organiza todos os componentes do projeto) dentro da pasta: `src`;
        1. Delete todo o código(ctrl + A + dete);
        2. Crie um componente padrão que retorne um fragmento vazio e possa ser exportado:
    
    2. Abra o arquivo: `index.css` (recebe a estilização que influência os demais componentes do projeto);
        1. Delete todo o código(ctrl + A + dete);
        2. Copie e cole a estilização padrão abaixo:



### ▷ Definir a hierarquia para armazenar os componentes:
- O que será feito:
    - Criar a estrutura de pasta e subpasta para organizar e armazenar os arquivos que compões os componentes;

- Passo a passo:
    1. Abra a pasta: `src` (abreviação de *source* ⇒ fonte, ou seja, é a pasta onde o código fonte é armazenado);
    2. Crie a subpasta: `layouts`, para agrupar as subpastas que compõem os componentes do corpo da página;
    3. Crie as subpastas: 
        1. `Header`, para armazenar os arquivos que compõem o componente do cabeçalho;
        2. `Boody`, para armazenar os arquivos que compõem o componente do corpo;
        3. `Footer`, para armazenar os arquivos que compõem o componente do roda pé;


### ▷ Criar e estilizar o componente:
- O que será feito:
    - Criar e nomear os arquivos: `.jsx` e `.module.css`;
    - Criar e definir o conteúdo do componente;
    - Definir qual parte do componente o estilo será aplicado;
    - Importar e criar a estilização; 

- Passo a passo:
    1. Crie o arquivo: `index.jsx` (contem todo o conteúdo do componente) dentro da pasta: `Header`;
        1. Crie uma `arrow function` que vai definir o corpo onde o conteúdo do `componente` fica armazenado;
        2. Crie o componente `Header` e defina o conteúdo do `componente`a ser retornado;
        3. Crie uma classe CSS onde a estilização será aplicada;
        4. Inclua a importação do estilo;
    
    2. Crie o arquivo: `Header.module.css` (contem toda a estilização do componente) dentro da pasta: `Header`;
        1. Crie a classe onde os parâmetros do estilo vão ficar armazenados;
        2. Defina os parâmetros do estilo a ser aplicadas no conteúdo do componente;
    
    -  Repita para criar e estilizar os `componentes`: `Boody` e `Footer`


### ▷ Utilizando o componente:
- O que será feito:
    - Alocar o componente criado;
    - Garantir que a importação foi feita;

- Passo a passo:
    1. Abra o arquivo `App.jsx` localizado dentro da pasta principal do projeto;
    2. Aloque os componentes: `Header`, `Boddy` e `Footer` dentro do componente padrão;
    3. Certifique-se de que as importações foram criadas automâticamente;
    -  Repita o processo para o componente: `Card`, sendo alocado no componente: `Boody`