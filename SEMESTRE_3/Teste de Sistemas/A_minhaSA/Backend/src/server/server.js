import express from 'express'
import { pool } from '../config/db.js'


const app = express()
const PORT = 3000

app.use(express.json())


app.get('/', (req, res) => {
    res.json({
        mensagem: 'Servidor está de pé e funcionando!'
    })
})// ↪ Rota principal

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})// ↪ Inicialização do servidor