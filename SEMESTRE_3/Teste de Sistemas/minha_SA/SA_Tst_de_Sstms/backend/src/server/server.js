import express from 'express'
import { pool } from '../config/db.js'


const app = express()
const PORT = 3000
app.use(express.json())


pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})


app.get("/", (_, res) => {
    res.json("Servidor de Pé e funcionando!")
})



app.listen(PORT, () => {
    console.log(`Servidor de Pé e funcionando em: http://localhost:${PORT}`)
})