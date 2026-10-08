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