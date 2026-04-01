import express from 'express'
import { prisma } from './prisma/prisma'
import type { Exame, Usuario } from './prisma/generated/prisma/client'


const port = 3000
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    console.log(req)
    res.send("Olá, meu Mundo! ^^")
})


//Endpoint Usuário

app.post("/cadastro", async (req, res) => {
  const ddsUsuario = req.body as Usuario
  const usuarioCdstrd = await prisma.usuario.create({
    data: {
      email: ddsUsuario.email,
      nome: ddsUsuario.nome || null,
      senha: hash
    }
  })
  return res.status(201).json(usuarioCdstrd)
}) //↪ Cadastrar usuário

app.put('/usuarios/:id', async (req, res)=>{
  const idUsuario = Number(req.params.id)
  const ddsParaAtualizar = req.body as Omit<Usuario, 'id'>

  const usuarioAtlzd = await prisma.usuario.update({
    data: {
      ...ddsParaAtualizar
    },
    where: {
      id: idUsuario
    }
  })
  return res.status(200).json({
    mensagem: `Alteração cadastral realizada com sucesso ^^`,
    data: usuarioAtlzd})
}) //↪ Atualizar dados do usuário

app.get('/usuarios', async (_, res) => {
  const lstusuarios = await prisma.usuario.findMany();
  res.json(lstusuarios)
}) //↪ Listar usuários cadastrados

app.get('/usuarios/:id', async (req, res)=>{
  const idUsuario = Number(req.params.id)
  const usuario = await prisma.usuario.findUnique({
    where:{
      id: idUsuario
    }
  })
  return res.status(200).json(usuario)
}) //↪ Buscar usuário por ID

app.delete('/usuarios/:id', async (req, res) =>{
  const idUsuario = Number(req.params.id)
  const dltdUsuario = await prisma.usuario.delete({
    where: {
      id: idUsuario
    }
  })
  return res.status(200).json({
    mensagem: `Usuário deletado com sucesso!`,
    data: dltdUsuario})
}) //↪ Deletar usuário por ID


//Endpoint Exames

app.post("/cdstrExame", async (req, res) => {
  const ddsExame = req.body as Exame
  const exameCdstrd = await prisma.exame.create({
    data: {
      tipo_exame: ddsExame.tipo_exame,
      valor: ddsExame.valor,
      descricao: ddsExame.descricao,
      data_exame: new Date(ddsExame.data_exame),
      resultado: ddsExame.resultado
    }
  })
  return res.status(201).json(exameCdstrd)
}) //↪ Cadastrar exame

app.put('/exames/:id', async (req, res)=>{
  const idExame = Number(req.params.id)
  const ddsParaAtualizar = req.body as Omit<Exame, 'id'>

  const exameAtlzd = await prisma.exame.update({
    data: {
      ...ddsParaAtualizar,
      data_exame: new Date(ddsParaAtualizar.data_exame)
    },
    where: {
      id: idExame
    }
  })
  return res.status(200).json(exameAtlzd)
}) //↪ Atualizar dados do exame

app.get('/exames', async (_, res) => {
  const lstexames = await prisma.exame.findMany()
  res.json(lstexames)
}) //↪ Listar exames cadastrados

app.get('/exames/:id', async (req, res)=>{
  const idExame = Number(req.params.id)
  const exame = await prisma.exame.findUnique({
    where:{
      id: idExame
    }
  })
  return res.status(200).json(exame)
}) //↪ Buscar exame por ID

app.delete('usuarios/:id', async (req, res) =>{
  const idExame = Number(req.params.id)
  const dltdExame = await prisma.exame.delete({
    where: {
      id: idExame
    }
  })
  return res.status(200).json({
    mensagem: `Exame número: ${idExame}, foi deletado com sucesso!`,
    data: dltdExame})
}) //↪ Deletar usuário por ID



app.listen(port, ()=>{
  console.log("Servidor ativado e Online")  
})