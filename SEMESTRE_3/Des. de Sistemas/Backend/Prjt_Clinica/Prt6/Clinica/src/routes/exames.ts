import { Router } from "express"
import type { Exame } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";


export const examesRouter = Router();


//Endpoint Exames
examesRouter.post("/cdstrExame", async (req, res) => {
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

examesRouter.put('/exames/:id', async (req, res)=>{
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

examesRouter.get('/exames', async (_, res) => {
  const lstexames = await prisma.exame.findMany()
  res.json(lstexames)
}) //↪ Listar exames cadastrados

examesRouter.get('/exames/:id', async (req, res)=>{
  const idExame = Number(req.params.id)
  const exame = await prisma.exame.findUnique({
    where:{
      id: idExame
    }
  })
  return res.status(200).json(exame)
}) //↪ Buscar exame por ID

examesRouter.delete('/exames/:id', async (req, res) =>{
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