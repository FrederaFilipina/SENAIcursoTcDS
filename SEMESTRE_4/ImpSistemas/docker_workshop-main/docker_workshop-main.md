## Etapa 1 - Dockerizando o Backend (30 min)
**Objetivo:** Criar um Dockerfile para o backend e rodar com Docker.
**O que voce precisa fazer:**
1. Crie um arquivo chamado `Dockerfile` dentro da pasta `backend/`
2. O Dockerfile deve:
   - Usar a imagem `node:20-alpine` como base
   - Definir o diretorio de trabalho como `/app`
   - Copiar os arquivos de dependencias e instalar com `npm install`
   - Copiar o restante do codigo
   - Expor a porta `8000`
   - Definir o comando para iniciar: `npm start`
3. Faca o build da imagem com `docker build`
4. Rode o container com `docker run`

**Como saber se deu certo:**
- No terminal, voce deve ver: `Backend rodando na porta 8000`
- O backend vai tentar conectar no banco e falhar - **isso eh esperado!** Vamos resolver na proxima etapa.

**Comandos uteis:**
```bash
docker build -t <nome-da-imagem> .
docker run -p <porta-host>:<porta-container> <nome-da-imagem>
```
Enviar somente o dockerfile do backend.
Critérios de avaliação: Arquivo dockerfile.

---
---
<br>

## Etapa 2 - Subindo o Banco de Dados (30 min)
**Objetivo:** Rodar o PostgreSQL em um container e conectar ao backend.
**O que voce precisa fazer:**
1. Suba um container PostgreSQL usando a imagem `postgres:16-alpine`
   - Use `-e` para definir as variaveis: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
   - Exponha a porta `5432`
2. Agora voce precisa que o backend **consiga se comunicar** com o banco. Para isso:
   - Crie uma **network** do Docker
   - Conecte **ambos os containers** nessa mesma network
   - Use a flag `-e` no backend para apontar o `DB_HOST` para o **nome do container** do banco
**Como saber se deu certo:**
- O backend deve logar: `Banco de dados conectado e tabela criada!`
- Acesse `http://localhost:8000/health` e veja `{"status":"ok"}`
- Teste criar uma tarefa:
  ```bash
  curl -X POST http://localhost:8000/tasks \
    -H "Content-Type: application/json" \
    -d '{"title": "Minha primeira tarefa"}'
  ```
**Comandos uteis:**
```bash
docker network create <nome-da-rede>
docker run --network <nome-da-rede> --name <nome> ...
```
---
Enviar um arquivo em .pdf comprovando que o terminal está rodando:
- print do terminal exibindo status "ok";
- comandos utilizados para rodar o banco de dados;

- print do Docker Desktop com a instância em running.

---
---
<br>

## Etapa 3 - Dockerizando o Frontend (20 min)
**Objetivo:** Criar um Dockerfile para o frontend e rodar com Docker.
**O que voce precisa fazer:**
1. Crie um arquivo chamado `Dockerfile` dentro da pasta `frontend/`
2. O Dockerfile eh muito parecido com o do backend, mas:
   - A porta exposta eh `3000`
   - O comando de iniciar eh `npm run dev`
3. Faca o build e rode o container
   - Passe a variavel de ambiente `NEXT_PUBLIC_API_URL` apontando para o backend
**Como saber se deu certo:**
- Acesse `http://localhost:3000` no navegador
- Voce deve ver a interface da Lista de Tarefas
- Adicione uma tarefa e veja se ela aparece na lista!
---
 
Critério de avaliação: Arquivo PDF contendo prints do Dockerfile do frontend, do build e execução do container, da interface rodando no navegador e da inclusão de uma tarefa na lista.