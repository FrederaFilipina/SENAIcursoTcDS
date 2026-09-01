import app from "./app.js"

const PORT = process.env.PORT ?? 8081

app.listen(PORT, () =>{
    console.log(`Servidor de pé e rodando na porta: http://localhost:${PORT}`)
})