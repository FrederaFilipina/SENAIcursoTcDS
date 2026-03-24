# Pasta destinada a criação de APIs básicas para estudos de testes

## Passo a Passo para criação de uma API básica:

### ▷ Configurações Iniciais:
01. Crie uma pasta para armazenar os arquivos da API;
02. Abra o terminal referente a pasta criada;
03. Execute os comandos:
    - npm init -y (inicializar um projeto Node.js apenas com o arquivo: `package.json` com valores padrão);
    - npm install express (instala a biblioteca: `Express`, trata-se de um framework usados para back-end em JavaScript. com a finalidade de criar servidores e APIs web);
04. Abra o arquivo: `package.json`;
05. Inclua dentro de `scripts`: `"start": "node ./src/server.js"` (usado no comando para executar a aplicação);
06. Acesse os site: https://jestjs.io/pt-BR/ (biblioteca usada para criar e executar testes automatizados);
    - Clique em: `Docs`, no cabeçalho;
    - Copie o comando de instalação;
07. Execute o comando copiado no terminal aberto anteriormente;
08. Volte no site: https://jestjs.io/pt-BR/docs/getting-started;
    - Clique em: `Guides` no menu lateral esquerdo;
    - Clique em: `ECMAScript Modules` (página de documentação para configurar);
    - Copie o script que executa o teste, está no passo 2 da documentação;
09. Abra novamente o arquivo: `package.json`;
10. Dentro de `scripts`:
    - Crie um tag (usado no comando para executar os teste);
    - Cole o script copiado;
---

### ▷ Estrutura mínima de funcionamento da API:
01. Crie a pasta: `src` dentro da pasta do projeto;
02. Crie os arquivos:
    - `App.js` (funcionamento da API)
    - `server.js` (configuração do servidor)
    - `userService.js` (regra de negócio)
03. Configure cada arquivo:
    01. `userService.js`:

            export function createUser(userData) {

                if(!userData.name){
                    throw new Error ("O nome do usuário obrigatório.")
                }
                
                if(userData.age < 18){
                    throw new Error("Idade inferior a mínima permitida")
                }
                
                return{
                    id: Math.floor(Math.random() * 1000),
                    name: userData.name,
                    age: userData.age,
                    isActive: true,
                    roles: ["user"]
                }
            }
    
    02. `App.js`:

            import express from "express"
            import { createUser } from "./userService.js"

            const app = express()

            app.use(express.json())
            app.post("/user", (req, res)=> {

                try{
                    const newUser = createUser(req.body)
                    res.status(201).json(newUser)
                }

                catch (error){
                    res.status(400).json({mensagem: error.mensagem})
                }
            })

            export default app
    
    03. `server.js`:
    
            import app from ".App.js"
            
            const Port = 3000;

            app.listen(Port, () =>{
                console.log(`Servidor Porta: ${Port}`)
            })
---

### ▷ Estrutura para os testes:
01. Crie a pasta: `tests` dentro da pasta do projeto;
02. Crie o arquivo: `tests.js`