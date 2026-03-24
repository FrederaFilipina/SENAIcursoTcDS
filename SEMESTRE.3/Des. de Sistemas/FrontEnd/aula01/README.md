# Aula 01
> Iniciando a revisão sobre fundamentos de React

### Componente: trata-se da junção do conteúdo, lógica de funcionamento e estilização em um único bloco. Podendo ser usado forma isolada, em conjunto com outros blocos e até mesmo de maneira repetida em lugares diferentes com a finalidade de criar a interface de uma aplicação.

##

### ▷ Preparar os arquivos para iniciar o projeto:
- O que será feito:
    - Deletar os códigos dos arquivos que vêm pronto como exemplo quando se cria projeto no React;
    - Criar o componente padrão que receberá todos os principais componentes do projeto;
    - Definir a estilização padrão que servirá de base para toda estilização dos componentes do projeto;

- Passo a passo:
    1. Acessar o arquivo: `App.jsx` (recebe e organiza todos os componentes do projeto);
    2. Deletar todo o código;
    3. Criar o componente padrão:
    
            01.     function App() {
            02.         return (
            03.             <>
            04.
            05.             </>
            06.         )
            07.     }
            08.     export default App
    
    4. Acessar o arquivo: `index.css` (recebe a estilização que influência os demais componentes do projeto);
    5. Deletar todo o código;
    6. Criar a estilização padrão:

            01.     *{
            02.         margin: 0;
            03.         padding: 0;
            04.         box-sizing: border-box;
            05.     }


### ▷ Definir a hierarquia para armazenar os componentes:
- O que será feito:
    - Criar a estrutura de pasta e subpasta para organizar e armazenar os arquivos que compões os componentes;

- Passo a passo:
    1. Abrir a pasta: `src` (abreviação de *source* ⇒ fonte, ou seja, é a pasta onde o código fonte é armazenado);

            📁 pasta principal do projeto
                📁 src

    2. Criar a pasta: `layouts`, vai agrupar as subpastas que compõem os componentes do corpo da página;

                📁 src
                    📂 layouts

    3. Criar a subpasta: `Header`, vai armazenar os arquivos que compõem o componente do cabeçalho;

                📂 layouts
                    📁 Header


### ▷ Criar e estilizar o componente:
- O que será feito:
    - Criar e nomear os arquivos: `.jsx` e `.module.css`;
    - Criar e definir o conteúdo do componente;
    - Definir qual parte do componente o estilo será aplicado;
    - Importar e criar a estilização; 

- Passo a passo:
    1. Criar o arquivo: `index.jsx` (contem todo o conteúdo do componente) dentro da pasta: `Header`;

                    📂 layouts
                        📁 Header
                            ↪ index.jsx

    2. Criar a função que vai definir o corpo onde o conteúdo do componente fica armazenado;

            ▶01.     const Header = () => {
             02.         return (
             03.             <>
             04.             
             05.             </>
             06.         )
             07.     }
            ▶08.     export default Header

    3. Definir o conteúdo dentro componente;

             01.     const Header = () => {
             02.         return (
            ▶03.             <header>
             04.
             05.                 <h1> Título <h1>
             06.
            ▶07.             </header>
             08.         )
             09.     }
             10.     export default Header

    4. Definir o local onde a estilização será aplicada;

             01.         return (
            ▶02.             <header className={styles.Header}>
             03.
             04.                 <h1>Título</h1>
             05.
             06.             </header>
             07.         )

    5. Criar o comando de importação do estilo;

            ▶01.     import styles from './Header.module.css'
             02.
             03.     const Header = () => {
             04.         return (
                ....
    
    6. Criar o arquivo: `Header.module.css` (contem toda a estilização do componente) dentro da pasta: `Header`;

                    📂 layouts
                        📁 Header
                            ↪ index.jsx
                            ↪ Header.module.css
  
    7. Criar a classe onde os parâmetros do estilo vão ficar armazenados;

            ▶01.     .Header{
             02.
             03.     }

    8. Defina os parâmetros do estilo a ser aplicadas no conteúdo do componente;

             01.     .Header{
            ▶02.         background-color: #ff00ff;
            ▶03.         color: #ffffff;
            ▶04.         padding: 20px;
            ▶05.         text-align: center;
             06.     }


### ▷ Utilizando o componente:
- O que será feito:
    - Alocar o componente criado;
    - Garantir que a importação foi feita;

- Passo a passo:
    1. Abrir o arquivo `App.jsx` localizado dentro da pasta principal do projeto;

            📁 pasta principal do projeto
                ↪ App.jsx

    2. Alocar o componente criado dentro do componente padrão;

             01.     const Header = () => {
             02.         return (
             03.            <>
            ▶04.                <Header />
             05.             </>
             06.         )
             07.     }
             08.     export default Header

    3. Certifique-se de que importação foi criada automâticamente;

            ▶01.    import Header from "./layouts/Header"
             02.
             03.     const Header = () => {
             04.         return (
                ....

##