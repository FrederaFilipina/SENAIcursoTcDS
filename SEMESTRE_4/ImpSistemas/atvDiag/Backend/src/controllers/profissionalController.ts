import type { Request, Response } from "express";
import { profissionalService, type ProfissionalService } from "../services/profissionalService";
import type { Profissional } from "../prisma/generated/prisma/client";

import { ErroHttp } from "../errors/erroHttp";

export class ProfissionalController {

    constructor(
        private readonly service: ProfissionalService
    ) {
        this.service = service;
    }

    async listarTdsProfissionais(
        req: Request,
        res: Response
    ) {

        try {

            const profissionais =
                await this.service.listarTdsProfissionais();

            return res.status(200).json(profissionais);

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

    async buscarProfissionalId(
        req: Request,
        res: Response
    ) {

        try {

            const idProfissional =
                Number(req.params.id);

            const profissional =
                await this.service.buscarProfissionalId(
                    idProfissional
                );

            return res.status(200).json(profissional);

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

    async criarProfissional(
        req: Request,
        res: Response
    ) {

        try {

            const dadosProfissional =
                req.body as Profissional;

            const profissionalCriado =
                await this.service.criarProfissional(
                    dadosProfissional
                );

            return res.status(201).json(
                profissionalCriado
            );

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

    async atualizarProfissional(
        req: Request,
        res: Response
    ) {

        try {

            const idProfissional =
                Number(req.params.id);

            const novosDadosProfissional =
                req.body as Omit<
                    Profissional,
                    "id" | "criadoEm" | "atualizadoEm"
                >;

            const profissionalAtualizado =
                await this.service.atualizarProfissional(
                    idProfissional,
                    novosDadosProfissional
                );

            return res.status(200).json(
                profissionalAtualizado
            );

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

    async deletarProfissional(
        req: Request,
        res: Response
    ) {

        try {

            const idProfissional =
                Number(req.params.id);

            const profissional =
                await this.service.deletarProfissional(
                    idProfissional
                );

            return res.status(200).json({
                mensagem: "Profissional deletado com sucesso!",
                data: profissional
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

export const profissionalController =
    new ProfissionalController(profissionalService);