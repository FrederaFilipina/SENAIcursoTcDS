import type { Request, Response } from "express";
import { disponibilidadeService, type DisponibilidadeService } from "../services/disponibilidadeService";
import type { Disponibilidade } from "../prisma/generated/prisma/client";

import { ErroHttp } from "../errors/erroHttp";

export class DisponibilidadeController {

    constructor(
        private readonly service: DisponibilidadeService
    ) {
        this.service = service;
    }

    async listarTdsDisponibilidades(
        req: Request,
        res: Response
    ) {

        try {

            const disponibilidades =
                await this.service.listarTdsDisponibilidades();

            return res.status(200).json(
                disponibilidades
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

    async buscarDisponibilidadeId(
        req: Request,
        res: Response
    ) {

        try {

            const idDisponibilidade =
                Number(req.params.id);

            const disponibilidade =
                await this.service.buscarDisponibilidadeId(
                    idDisponibilidade
                );

            return res.status(200).json(
                disponibilidade
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

    async listarDisponibilidadesProfissional(
        req: Request,
        res: Response
    ) {

        try {

            const profissionalId =
                Number(req.params.profissionalId);

            const disponibilidades =
                await this.service
                    .listarDisponibilidadesProfissional(
                        profissionalId
                    );

            return res.status(200).json(
                disponibilidades
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

    async criarDisponibilidade(
        req: Request,
        res: Response
    ) {

        try {

            const dadosDisponibilidade =
                req.body as Disponibilidade;

            const disponibilidadeCriada =
                await this.service.criarDisponibilidade(
                    dadosDisponibilidade
                );

            return res.status(201).json(
                disponibilidadeCriada
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

    async atualizarDisponibilidade(
        req: Request,
        res: Response
    ) {

        try {

            const idDisponibilidade =
                Number(req.params.id);

            const novosDadosDisponibilidade =
                req.body as Omit<
                    Disponibilidade,
                    "id" | "criadoEm" | "atualizadoEm"
                >;

            const disponibilidadeAtualizada =
                await this.service
                    .atualizarDisponibilidade(
                        idDisponibilidade,
                        novosDadosDisponibilidade
                    );

            return res.status(200).json(
                disponibilidadeAtualizada
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

    async deletarDisponibilidade(
        req: Request,
        res: Response
    ) {

        try {

            const idDisponibilidade =
                Number(req.params.id);

            const disponibilidade =
                await this.service.deletarDisponibilidade(
                    idDisponibilidade
                );

            return res.status(200).json({
                mensagem:
                    "Disponibilidade deletada com sucesso!",
                data: disponibilidade
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

export const disponibilidadeController = new DisponibilidadeController( disponibilidadeService );