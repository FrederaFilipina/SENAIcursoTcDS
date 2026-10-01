import "dotenv/config";

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log(
    "DB_PASSWORD:",
    process.env.DB_PASSWORD ? "CARREGADA" : "NÃO CARREGADA"
);
console.log("DB_NAME:", process.env.DB_NAME);

import app from "./app.js";

const PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
    console.log(`Servidor ativo e de pé na porta http://localhost:${PORT}`);
});
