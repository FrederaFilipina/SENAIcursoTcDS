require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function initDB() {
    const maxRetries = 10;

    for (let i = 0; i < maxRetries; i++) {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS tasks (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    completed BOOLEAN DEFAULT false,
                    created_at TIMESTAMP DEFAULT NOW()
                )
            `);

            console.log("Banco de dados conectado e tabela criada!");
            return;

        } catch (err) {
            console.log(
                `Tentativa ${i + 1}/${maxRetries} - Aguardando banco de dados...`
            );

            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }

    console.error("Nao foi possivel conectar ao banco de dados");
    process.exit(1);
}

module.exports = { pool, initDB };