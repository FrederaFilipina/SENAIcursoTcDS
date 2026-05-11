import express from 'express'

import { pool } from '../config/db.js'

import moradorRoutes from '../routes/moradorRoutes.js'
import authRoutes from '../routes/authRoutes.js'


const app = express()

const PORT = 3000


app.use(express.json())


// ↪ Registro das rotas
app.use('/moradores', moradorRoutes)

app.use('/auth', authRoutes)



pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})



app.get("/", (_, res) => {
    res.json("Servidor de Pé e funcionando!")
})



app.listen(PORT, () => {
    console.log(
        `Servidor de Pé e funcionando em: http://localhost:${PORT}`
    )
})