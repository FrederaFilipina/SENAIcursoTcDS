import type { Request, Response } from "express";
import { agendamentoService, type AgendamentoService } from "../services/agendamentoService";
import type { Agendamento } from "../prisma/generated/prisma/client";
import { ErroHttp } from "../errors/erroHttp";

export class AgendamentoController {

    constructor(
        private readonly service: AgendamentoService
    ) {
        this.service = service;
    }

    async listarTdsAgendamentos(
        req: Request,
        res: Response
    ) {

        try {

            const agendamentos =
                await this.service
                    .listarTdsAgendamentos();

            return res.status(200).json(
                agendamentos
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

    async buscarAgendamentoId(
        req: Request,
        res: Response
    ) {

        try {

            const idAgendamento =
                Number(req.params.id);

            const agendamento =
                await this.service.buscarAgendamentoId(
                    idAgendamento
                );

            return res.status(200).json(
                agendamento
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

    async listarAgendamentosCliente(
        req: Request,
        res: Response
    ) {

        try {

            const clienteId =
                Number(req.params.clienteId);

            const agendamentos =
                await this.service
                    .listarAgendamentosCliente(
                        clienteId
                    );

            return res.status(200).json(
                agendamentos
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

    async listarAgendamentosProfissional(
        req: Request,
        res: Response
    ) {

        try {

            const profissionalId =
                Number(req.params.profissionalId);

            const agendamentos =
                await this.service
                    .listarAgendamentosProfissional(
                        profissionalId
                    );

            return res.status(200).json(
                agendamentos
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

    async listarAgendamentosUsuario(
        req: Request,
        res: Response
    ) {

        try {

            const usuarioId =
                Number(req.params.usuarioId);

            const agendamentos =
                await this.service
                    .listarAgendamentosUsuario(
                        usuarioId
                    );

            return res.status(200).json(
                agendamentos
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

    async criarAgendamento(
        req: Request,
        res: Response
    ) {

        try {

            const dadosAgendamento =
                req.body as Agendamento;

            const agendamentoCriado =
                await this.service.criarAgendamento(
                    dadosAgendamento
                );

            return res.status(201).json(
                agendamentoCriado
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

    async atualizarAgendamento(
        req: Request,
        res: Response
    ) {

        try {

            const idAgendamento =
                Number(req.params.id);

            const novosDadosAgendamento =
                req.body as Omit<
                    Agendamento,
                    "id" | "criadoEm" | "atualizadoEm"
                >;

            const agendamentoAtualizado =
                await this.service
                    .atualizarAgendamento(
                        idAgendamento,
                        novosDadosAgendamento
                    );

            return res.status(200).json(
                agendamentoAtualizado
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

    async deletarAgendamento(
        req: Request,
        res: Response
    ) {

        try {

            const idAgendamento =
                Number(req.params.id);

            const agendamento =
                await this.service
                    .deletarAgendamento(
                        idAgendamento
                    );

            return res.status(200).json({
                mensagem:
                    "Agendamento deletado com sucesso!",
                data: agendamento
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

export const agendamentoController = new AgendamentoController( agendamentoService );