# Aula 02
> Continuando a revisão sobre fundamentos de React

### Componente: trata-se da junção do conteúdo, lógica de funcionamento e estilização em um único bloco. Podendo ser usado forma isolada, em conjunto com outros blocos e até mesmo de maneira repetida em lugares diferentes com a finalidade de criar a interface de uma aplicação.

### Props (*properties* = propriedades): 
##

### ▷ Expandir a hierarquia de armazenamento de componentes:
- O que será feito:
    - Aumentar a estrutura de pasta e subpasta para organizar e armazenar os arquivos que compões os novos componentes;

- Passo a passo:
    1. Abrir a pasta: `src` (abreviação de *source* ⇒ fonte, ou seja, é a pasta onde o código fonte é armazenado);

            📁 pasta principal do projeto
                📁 src

    2. Abrir a pasta: `layouts`, vai agrupar as subpastas que compõem os componentes do corpo da página;

            📁 src
                📂 layouts

    3. Criar as subpastas: `Body` e `Footer`, vai armazenar os arquivos que compõem o componente do corpo e rodapé respectivamente;

            💼 aula02
                📂 src
                    📁 components
                        📂 Card
                    📁 layouts
                        📂 Body     
                        📂 Footer   
                        📂 Header                        

### ▷ Criar a base dos componente:
- O que será feito:
    - Criar e nomear os arquivos: `.jsx` e `.module.css`;
    - Criar a base dos componentes;

- Passo a passo:
    1. Componentes do `layouts`:
        - `Body`:
            1. Criar o arquivo: `index.jsx` (contem todo o conteúdo do componente);

                    📂 layouts
                    📁 Body
                        ↪ index.jsx

            2. Criar a função que vai definir o corpo onde o conteúdo do componente fica armazenado;

                    ▶01.     const Body = () => {
                    02.         return (
                    03.            <div>
                    04.             
                    05.            <div/>
                    06.         )
                    07.     }
                    ▶08.     export default Body
        
        - `Footer`:
            1. Criar o arquivo: `index.jsx` (contem todo o conteúdo do componente);

                            📂 layouts
                                📁 Footer
                                    ↪ index.jsx

            2. Criar a função que vai definir o corpo onde o conteúdo do componente fica armazenado;

                    ▶01.     export function Footer = () => {
                    02.         return (
                    03.            <div>
                    04.             
                    05.            <div/>
                    06.         )
                    ▶07.     }
            ---
    2. Componente do `components`:
        - `Card`:
            1. Criar o arquivo: `index.jsx` (contem todo o conteúdo do componente);

                        📂 components
                            📁 Card
                                ↪ index.jsx

            2. Criar a função que vai definir o corpo onde o conteúdo do componente fica armazenado;

                        ▶01.     const Card = () => {
                        02.         return (
                        03.            <div>
                        04.             
                        05.            <div/>
                        06.         )
                        07.     }
                        ▶08.     export default Card
                    
### ▷ Criar o conteúdo e utilizar os componente:
- O que será feito:
    - Definir o conteúdo do componente;
    - Definir qual parte do componente o estilo será aplicado;
    - Importar e criar a estilização;
    - Alocar o componente criado;
    - Garantir que a importação foi feita;

- Passo a passo:
    1. Componente do `components`:
        - `Card`:
            1. Definir o conteúdo dentro componente;