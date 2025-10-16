const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const port = 3000;

let connection;

async function initDB() {
    connection = await mysql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        database: "atv06_api",
        user: "root",
        password: "senai",
    });
    console.log("Conectado ao banco de dados!");
}

initDB().catch((err) => {
    console.error("Erro ao conectar ao banco:", err);
    process.exit(1);
});

app.use(express.json());

// Logger completo: loga request e resposta com corpo e tempo de execuÃ§Ã£o
app.use((req, res, next) => {
    const start = process.hrtime.bigint();
    const timestamp = new Date().toISOString();
    const { method, url, query } = req;
    const reqBody = req.body;

    // Intercepta res.json e res.send para capturar o corpo da resposta
    const originalJson = res.json.bind(res);
    const originalSend = res.send.bind(res);
    let responseBody;

    res.json = (body) => {
        responseBody = body;
        return originalJson(body);
    };
    res.send = (body) => {
        try {
            responseBody = body;
        } catch {
            responseBody = "[unserializable]";
        }
        return originalSend(body);
    };

    res.on("finish", () => {
        const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
        const status = res.statusCode;

        // Evita logs gigantes e falhas de stringify
        const trunc = (val) => {
            try {
                const str = typeof val === "string" ? val : JSON.stringify(val);
                if (!str) return str;
                return str.length > 1000 ? str.slice(0, 1000) + "... [truncated]" : str;
            } catch {
                return "[unserializable]";
            }
        };

        console.log(
            `[${timestamp}] ${method} ${url} ${status} ${durationMs.toFixed(1)}ms`
        );
        if (reqBody && Object.keys(reqBody).length) {
            console.log("  req.body:", trunc(reqBody));
        }
        if (query && Object.keys(query).length) {
            console.log("  req.query:", trunc(query));
        }
        if (responseBody !== undefined) {
            console.log("  res.body:", trunc(responseBody));
        }
    });

    next();
});

app.post("/bancoDados", async (req, res) => {
    const { nome, endereco, email, telefone } = req.body;
    try {
        const [result] = await connection.query(
            "INSERT INTO cliente (nome, endereco, email, telefone) VALUES (?, ?, ?, ?)",
            [nome, endereco, email, telefone]
        );
        // O que a query realmente retorna:
        // const resultado = await connection.query("INSERT INTO...");
        // resultado = [dados, campos]
        // resultado[0] = dados (o que queremos , os dados inseridos)
        // resultado[1] = campos (metadados, que serve para coisas mais avanÃ§adas, como por exemplo saber o tipo de dado de cada campo, geralmente nÃ£o precisamos disso)
        // Do jeito que tamo fazendo seria a mesma coisa que: result = resultado[0]
        res.status(201).json({
            id: result.insertId,
            nome,
            endereco,
            email,
            telefone,
        });
        // Acima acessamos o ID do novo cliente com result.insertId porque a estrutura que estamos pegando  Ã© o primeiro item do array ou seja , result = resultado[0]. Sempre que o mysql tem uma coluna AI , quando Ã© feito um insert ele retorna, abaixo:
        // {
        //   fieldCount: 0,
        //   affectedRows: 1,      // quantas linhas foram afetadas
        //   insertId: 5,          // â† O ID que foi gerado automaticamente pelo MySQL
        //   info: '',
        //   serverStatus: 2,
        //   warningStatus: 0
        // }
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ erro: "Falha do servidor ao criar o cliente" });
    }
});

app.get("/bancoDados", async (req, res) => {
    try {
        const [clientes] = await connection.query("SELECT * FROM cliente");
        res.json(clientes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ erro: "Falha do servidor ao listar clientes" });
    }
});

app.get("/bancoDados/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [cliente] = await connection.query(
            "SELECT * FROM cliente WHERE id_cliente = ?",
            [id]
        );
        if (cliente.length === 0) {
            return res.status(404).json({ erro: "Cliente nÃ£o encontrado" });
        }
        res.json(cliente[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ erro: "Falha do servidor ao buscar cliente" });
    }
});

app.put("bancoDados/:id", async(req, res) =>{
    const { id } = req.parmas
    try{
        const [ciente] = await connection.query(
            ""
        )
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ erro: "Falha do servidor ao buscar cliente" });
    }
})

// Middleware de tratamento e log de erros (fica apÃ³s as rotas)
// Qualquer erro nÃ£o tratado em rotas cairÃ¡ aqui
app.use((err, req, res, next) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR ${req.method} ${req.url}:`, err);
    if (res.headersSent) return next(err);
    res.status(500).json({ erro: "Falha interna do servidor" });
});

app.listen(port, () => {
    console.log("API táh Funcionando");
});