import express from 'express'
import { pool } from './config/bd.js'

const app = express()
const Port = 3000
app.use(express.json())

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

const client = await pool.connect()

app.get("/", (req, res) => {
    res.json("Olá, Mundo da minha SA!")
})

app.post("/alunos", async (req, res) => {
    try {
        const { nome } = req.body;

        // validação básica
        if (!nome) {
            return res.status(400).json({ erro: "Nome é obrigatório"})
        }

        const resultado = await pool.query( "INSERT INTO alunos (nome) VALUES ($1) RETURNING *",[nome])

        res.status(201).json({
            mensagem: "Aluno cadastrado com sucesso",
            aluno: resultado.rows[0]
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: error.message
        })
    }
})

app.get("/alunos", async (req, res) => {
    try {
        const restorno = await client.query("SELECT * from alunos")
        res.status(200).json(restorno.rows)
    } catch (error) {
        throw new Error(error);
    }
})

app.listen(Port, () => {
    console.log(`Aplicação rodando em: http://localhost:${Port}`)
})