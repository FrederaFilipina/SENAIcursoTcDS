import express from "express"
import type { Exame, Usuario, TypeToken } from "./prisma/generated/prisma/client"
import { prisma } from "./prisma/prisma"
import { creatHash } from "./utils/createHash"
import bcrypt from "bcrypt";
import { signTokenAcesso, signTokenRefresh } from "./utils/jwt";
import { auth } from "./middleware/auth";

const port = 3000
const app = express()

app.use(express.json())
app.get('/', (_,res) =>{
    res.send('Olá, meu Mundinho!')
})


//Autenticação
app.post("/cadastro", async (req, res) => {
  const ddsUsuario = req.body as Usuario
  const hash = await creatHash(ddsUsuario.senha)
  const usuarioCdstrd = await prisma.usuario.create({
    data: {
        nome: ddsUsuario.nome,
        email: ddsUsuario.email,
        senha: hash
    }
  })
  return res.status(201).json({
    message: "Usuário criado com sucesso!",data:usuarioCdstrd})
}) //↪ Cadastrar usuário

app.post("/login", async (req, res) =>{
  const ddsUsuario = req.body as Partial<Usuario>
  const usuarioExistente = await prisma.usuario.findUnique({
    where:{
      email: ddsUsuario.email || ''
    }
  })
  const credenciaisValidas = await bcrypt.compare(ddsUsuario.senha || '', usuarioExistente?.senha || '')

  if(usuarioExistente && credenciaisValidas){
    const tokenAcesso = signTokenAcesso({
      nome: usuarioExistente.nome,
      email: usuarioExistente.email
    })
    const tokenRefresh = signTokenRefresh({
      nome: usuarioExistente.nome,
      email: usuarioExistente.email
    })

    const accessExpires = new Date()
    const accessExpiresUpdate = accessExpires.setHours(accessExpires.getHours()+1)
    await prisma.token.create({
      data:{
        token: tokenAcesso, expiresAt: new Date (accessExpiresUpdate), type:'ACCESS', usuarioId: usuarioExistente.id
      }
    })
    //↪ Login de acesso

    const refreshExpires = new Date()
    const refreshExpiresUpdate = refreshExpires.setHours(refreshExpires.getHours()+1)
    await prisma.token.create({
      data:{
        token: tokenAcesso, expiresAt: new Date (refreshExpiresUpdate), type:'REFRESH', usuarioId: usuarioExistente.id
      }
    })
    //↪ Manutenção do acesso

    return res.status(200).json({
      message: "Usuário autenticado com sucesso!",
      accessToken: tokenAcesso,
      refreshToken: tokenRefresh
    })
  }

  return res.status(401).json({
    message: "Credenciais inválidas"
  })

})

app.use(auth)



//Endpoint Usuário
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
      nome_exame: ddsExame.nome_exame,
      data_exame: new Date(ddsExame.data_exame),
      descricao: ddsExame.descricao,
      valor: ddsExame.valor,
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

app.delete('/exames/:id', async (req, res) =>{
  const idExame = Number(req.params.id)
  const dltdExame = await prisma.exame.delete({
    where: {
      id: idExame
    }
  })
  return res.status(200).json({
    mensagem: `Exame número: ${idExame}, foi deletado com sucesso!`,
    data: dltdExame})
}) //↪ Deletar exames por ID



app.listen(port, () =>{
    console.log('Servidor ativado e ONLINE!')
})