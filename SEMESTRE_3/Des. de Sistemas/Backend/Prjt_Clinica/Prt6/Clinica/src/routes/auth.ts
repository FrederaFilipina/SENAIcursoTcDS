import bcrypt from "bcrypt"

import { Router } from "express";
import type { Usuario } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";
import { creatHash } from "../utils/createHash";
import { signTokenAcesso, signTokenRefresh } from "../utils/jwt";

export const authRouter = Router();


//Autenticação
authRouter.post("/cadastro", async (req, res) => {
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

authRouter.post("/login", async (req, res) =>{
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