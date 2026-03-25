import express from 'express'
import { prisma } from './prisma/prisma'
import type { Usuario } from './prisma/generated/prisma/client'


const port = 3000
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    console.log(req)
    res.send("Olá, meu Mundo! ^^")
})


//Endpoint Usuário

app.post("/cadastro", async (req, res) => {
  console.log(req.body)
  const ddsUsuario = req.body as Usuario
  const usuarioCdstrd = await prisma.usuario.create({
    data: {
      email: ddsUsuario.email,
      name: ddsUsuario.nome || null
    }
  })
  return res.status(201).json(usuarioCdstrd)
})

app.get('/usuarios', async (req, res) => {
  console.log(req.body)
  const lstusuarios = await prisma.usuario.findMany();
  res.json(lstusuarios);
})



app.listen(port, ()=>{
  console.log("Servidor ativado e Online")  
})