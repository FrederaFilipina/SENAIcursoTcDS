import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config()


const bd = mysql2.createPool({
    host: process.env.BD_HOST ?? "localhost",
    user: process.env.BD_USER ?? "root",
    password: process.env.BD_PASSWORD ?? "SENHA",
    database: process.env.BD_NAME ?? "NOME",

    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default bd