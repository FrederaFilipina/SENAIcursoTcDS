import { Router } from "express";
import type { Usuario } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";


export const userRouter = Router();


//Endpoint Usuário
userRouter.put('/usuarios/:id', async (req, res)=>{
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

userRouter.get('/usuarios', async (_, res) => {
  const lstusuarios = await prisma.usuario.findMany();
  res.json(lstusuarios)
}) //↪ Listar usuários cadastrados

userRouter.get('/usuarios/:id', async (req, res)=>{
  const idUsuario = Number(req.params.id)
  const usuario = await prisma.usuario.findUnique({
    where:{
      id: idUsuario
    }
  })
  return res.status(200).json(usuario)
}) //↪ Buscar usuário por ID

userRouter.delete('/usuarios/:id', async (req, res) =>{
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