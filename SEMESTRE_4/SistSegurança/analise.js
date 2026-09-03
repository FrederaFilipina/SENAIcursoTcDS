import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
// ❌ ERRO 14 — CORS totalmente permissivo.
// Qualquer origem pode fazer requisições para a API.

const PORT = 8081;

const db = await mysql.createPool({
    host: "localhost",

    user: "root",
    // ❌ ERRO 6 — A aplicação utiliza o usuário root do MySQL.

    password: "",
    // ❌ ERRO 7 — O usuário do banco está configurado sem senha.

    database: "desi_20251"

    // ❌ ERRO 5 — As credenciais/configurações do banco estão diretamente
    // no código, em vez de serem obtidas de forma segura por variáveis
    // de ambiente.
});


// ===============================
// LOGIN
// ===============================

app.post("/login", async (req, res) => {

    const { email, senha } = req.body;

    // ❌ ERRO 15 — Não existe validação de entrada.
    // email e senha podem conter qualquer conteúdo/tamanho.

    try {

        const [usuarios] = await db.query(
            `SELECT * FROM usuario 
             WHERE email = '${email}' 
             AND senha = '${senha}'`
        );

        // ❌ ERRO 1 — SQL Injection.
        //
        // email e senha são inseridos diretamente na query.
        //
        // Exemplo conceitual:
        // email = ' OR 1=1 --
        //
        // Isso pode alterar a lógica da consulta SQL.

        // ❌ ERRO 4 — Senha em texto puro.
        // A aplicação compara diretamente a senha recebida com a
        // senha armazenada no banco.
        //
        // Não há evidência de utilização de hash como bcrypt ou Argon2.

        // ❌ ERRO 20 — SELECT *.
        // Todas as colunas da tabela são recuperadas, mesmo aquelas
        // que podem ser desnecessárias.

        if (usuarios.length > 0) {

            res.json({
                mensagem: "Login realizado com sucesso!",
                usuario: usuarios[0]
            });

            // ❌ ERRO 11 — Possível exposição de dados sensíveis.
            //
            // Como foi utilizado SELECT *, usuarios[0] pode conter
            // a senha armazenada no banco e outros campos sensíveis.
        } else {

            res.status(401).json({
                mensagem: "Usuário ou senha incorretos"
            });
        }

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao realizar login"
        });
    }
});


// ===============================
// BUSCAR USUÁRIO
// ===============================

app.get("/usuarios/:id", async (req, res) => {

    const { id } = req.params;

    // ❌ ERRO 15 — Não existe validação do id.
    // O valor recebido pela URL é utilizado diretamente na consulta.

    try {

        const [usuarios] = await db.query(
            `SELECT * FROM usuario WHERE id = ${id}`
        );

        // ❌ ERRO 2 — SQL Injection.
        //
        // id vem diretamente de req.params e é concatenado na query.
        //
        // O atacante pode manipular o parâmetro:
        //
        // /usuarios/1 OR 1=1
        //
        // dependendo do comportamento do banco e da query.

        // ❌ ERRO 20 — SELECT * novamente.
        // Pode retornar informações que não deveriam ser expostas.

        if (usuarios.length === 0) {

            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        res.json(usuarios[0]);

        // ❌ ERRO 8 — Ausência de autenticação.
        // Qualquer pessoa que consiga acessar essa rota pode tentar
        // consultar um usuário.
        //
        // ❌ ERRO 11 — Pode retornar informações sensíveis,
        // inclusive a senha, dependendo das colunas da tabela.

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao buscar usuário"
        });
    }
});


// ===============================
// ÁREA ADMINISTRATIVA
// ===============================

app.delete("/usuarios/:id", async (req, res) => {

    const { id } = req.params;

    // ❌ ERRO 9 — Não existe verificação de autorização.
    // Não há nenhuma confirmação de que quem está fazendo a requisição
    // é realmente um administrador.

    // ❌ ERRO 15 — Não existe validação do id.

    try {

        const [usuarios] = await db.query(
            `SELECT * FROM usuario WHERE id = ${id}`
        );

        // ❌ ERRO 3 — SQL Injection.
        // id é inserido diretamente na query.

        // ❌ ERRO 2 — Também se aplica aqui:
        // entrada controlada pelo usuário é concatenada diretamente
        // na consulta SQL.

        if (usuarios.length === 0) {

            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        await db.query(
            `DELETE FROM usuario WHERE id = ${id}`
        );

        // ❌ ERRO 3 — SQL Injection novamente.
        //
        // O id é concatenado diretamente na query DELETE.
        //
        // ❌ ERRO 9 — Qualquer pessoa que consiga chamar essa rota
        // pode tentar excluir usuários, pois não existe autorização
        // administrativa.

        res.json({
            mensagem: `Usuário ${usuarios[0].nome} excluído com sucesso!`
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao excluir usuário"
        });
    }
});


// ===============================
// TRATAMENTO DE ERRO
// ===============================

app.get("/erro", (req, res) => {

    throw new Error(
        "Erro no banco de dados: senha do banco = 123456"
    );

    // ❌ ERRO 12 — Vazamento de informação sensível.
    //
    // A mensagem contém explicitamente uma senha:
    //
    // "senha do banco = 123456"
    //
    // Informações como senhas, credenciais, estrutura interna
    // e detalhes do banco não devem aparecer em mensagens de erro.
});


// ===============================
// SERVIDOR
// ===============================

app.listen(PORT, () => {

    console.log(
        `Servidor rodando na portinha => http://localhost:${PORT}/`
    );

    // ❌ ERRO 18 — O servidor utiliza HTTP e não HTTPS.
    //
    // Em produção, credenciais e outros dados podem trafegar
    // sem criptografia se não houver HTTPS/TLS.
});