import type { Request, Response } from "express";
import { usuarioService, type UsuarioService } from "../services/usuarioServices";
import type { Usuario } from "../prisma/generated/prisma/client";
import { ErroHttp } from "../errors/erroHttp";

export class UsuarioController {

    constructor(private readonly service: UsuarioService) {
        this.service = service;
    }

    async listarTdsUsuarios(req: Request, res: Response) {

        try {

            const usuarios =
                await this.service.listarTdsUsuarios();

            return res.status(200).json(usuarios);

        } catch (error) {

            if (error instanceof ErroHttp) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro interno do servidor."
            });
        }
    }

    async buscarUsuarioId(req: Request, res: Response) {

        try {

            const idUsuario =
                Number(req.params.id);

            const usuario =
                await this.service.buscarUsuarioId(idUsuario);

            return res.status(200).json(usuario);

        } catch (error) {

            if (error instanceof ErroHttp) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro interno do servidor."
            });
        }
    }

    async buscarUsuarioEmail(req: Request, res: Response) {

        try {

            const email =
                String(req.params.email);

            const usuario =
                await this.service.buscarUsuarioEmail(email);

            return res.status(200).json(usuario);

        } catch (error) {

            if (error instanceof ErroHttp) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro interno do servidor."
            });
        }
    }

    async criarUsuario(req: Request, res: Response) {

        try {

            const dadosUsuario =
                req.body as Usuario;

            const usuarioCriado =
                await this.service.criarUsuario(
                    dadosUsuario
                );

            return res.status(201).json(usuarioCriado);

        } catch (error) {

            if (error instanceof ErroHttp) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro interno do servidor."
            });
        }
    }

    async atualizarUsuario(req: Request, res: Response) {

        try {

            const idUsuario =
                Number(req.params.id);

            const novosDadosUsuario =
                req.body as Omit<
                    Usuario,
                    "id" | "criadoEm" | "atualizadoEm"
                >;

            const usuarioAtualizado =
                await this.service.atualizarUsuario(
                    idUsuario,
                    novosDadosUsuario
                );

            return res.status(200).json(usuarioAtualizado);

        } catch (error) {

            if (error instanceof ErroHttp) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro interno do servidor."
            });
        }
    }

    async deletarUsuario(req: Request, res: Response) {

        try {

            const idUsuario =
                Number(req.params.id);

            const usuario =
                await this.service.deletarUsuario(
                    idUsuario
                );

            return res.status(200).json({
                mensagem: "Usuário deletado com sucesso!",
                data: usuario
            });

        } catch (error) {

            if (error instanceof ErroHttp) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }

            return res.status(500).json({
                error: "Erro interno do servidor."
            });
        }
    }
}

export const usuarioController = new UsuarioController(usuarioService);