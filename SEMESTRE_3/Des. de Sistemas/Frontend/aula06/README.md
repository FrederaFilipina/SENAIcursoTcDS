1. https://reactrouter.com/
2. data Mode
3. Installation: https://reactrouter.com/start/data/installation
4. install React Router from npm: npm i react-router-dom
5. arquivo main.jsx:
    - import { createBrowserRouter } from "react-router";
    - import { RouterProvider } from "react-router-dom";

6. https://www.npmjs.com/package/json-server
    - npm i json-server
7. criar a pasta service dentro da pasta do projeto
8. criar o arquivo: db.json
9. colar:

                {
            "$schema": "./node_modules/json-server/schema.json",
            "posts": [
                { "id": "1", "title": "a title", "views": 100 },
                { "id": "2", "title": "another title", "views": 200 }
            ],
            "comments": [
                { "id": "1", "text": "a comment about post 1", "postId": "1" },
                { "id": "2", "text": "another comment about post 1", "postId": "1" }
            ],
            "profile": {
                "name": "typicode"
            }
            }

10. rodar: npx json-server services/db.json
    - como o arquivo: db.json está dentro de uma subpasta, é preciso indicar o nome da pasta e o nome do arquivo
    - jogar dentro do script no arquivo packge.json;
11. acessar o site: https://tailwindcss.com/
    - Entrar em Documentation
    - Procurar o modo de instalação do Vite (passo 2)
    - Instalar: npm install tailwindcss @tailwindcss/vite
    - abrir o arquivo: vite.config.js
        - colar: import tailwindcss from '@tailwindcss/vite';
        - colar dentro do plugins: tailwindcss()
        - substituir dentro de index.css os códigos por: @import "tailwindcss";
12. dentro de src, criar subpasta layouts eoutra como pages
13. dentro de pages > pasta Home e arquivo index.jsx
14. dentro de pages> pasta Sobre e arquivo.jsx
15. dentro do arquivo: main.jsx, fazer as rotas
    - {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sobre",
    element: <Sobre />,
  },
  16. criar dentro de Layout, Header. Footer e Body
  17. instalar a extensão no VsCode: Tailwind CSS

PAra abrir o:
1º npm run dev
2ª em paralelo(split temrinal) npm run server