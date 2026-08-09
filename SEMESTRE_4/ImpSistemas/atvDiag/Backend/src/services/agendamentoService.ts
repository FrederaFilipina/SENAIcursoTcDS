import type { Agendamento, StatusAgendamento } from "../prisma/generated/prisma/client";
import { agendamentoRepository, type AgendamentoRepository } from "../repositories/agendamentoRepository";
import { prisma } from "../prisma/prisma";
import { ErroHttp } from "../errors/erroHttp";

export class AgendamentoService {

    constructor(
        private readonly repository: AgendamentoRepository
    ) {
        this.repository = repository;
    }

    /* Lista todos os agendamentos. */
    async listarTdsAgendamentos() {

        try {

            return await this.repository
                .listarTdsAgendamentos();

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao listar agendamentos: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao listar agendamentos.",
                500
            );
        }
    }

    /* Busca um agendamento pelo ID. */
    async buscarAgendamentoId(
        idAgendamento: number
    ) {

        try {

            if (
                !idAgendamento ||
                idAgendamento <= 0
            ) {
                throw new ErroHttp(
                    "ID do agendamento inválido.",
                    400
                );
            }

            const agendamento =
                await this.repository.buscarAgendamentoId(
                    idAgendamento
                );

            if (!agendamento) {
                throw new ErroHttp(
                    "Agendamento não encontrado.",
                    404
                );
            }

            return agendamento;

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao buscar agendamento: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao buscar agendamento.",
                500
            );
        }
    }

    /* Lista os agendamentos de um cliente. */
    async listarAgendamentosCliente(
        clienteId: number
    ) {

        try {

            if (!clienteId || clienteId <= 0) {
                throw new ErroHttp(
                    "ID do cliente inválido.",
                    400
                );
            }

            return await this.repository
                .listarAgendamentosCliente(
                    clienteId
                );

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao listar agendamentos do cliente: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao listar agendamentos do cliente.",
                500
            );
        }
    }

    /* Lista os agendamentos de um profissional. */
    async listarAgendamentosProfissional(
        profissionalId: number
    ) {

        try {

            if (
                !profissionalId ||
                profissionalId <= 0
            ) {
                throw new ErroHttp(
                    "ID do profissional inválido.",
                    400
                );
            }

            return await this.repository
                .listarAgendamentosProfissional(
                    profissionalId
                );

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao listar agendamentos do profissional: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao listar agendamentos do profissional.",
                500
            );
        }
    }

    /* Lista os agendamentos de um usuário. */
    async listarAgendamentosUsuario(
        usuarioId: number
    ) {

        try {

            if (!usuarioId || usuarioId <= 0) {
                throw new ErroHttp(
                    "ID do usuário inválido.",
                    400
                );
            }

            return await this.repository
                .listarAgendamentosUsuario(
                    usuarioId
                );

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao listar agendamentos do usuário: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao listar agendamentos do usuário.",
                500
            );
        }
    }

    /* Cria um novo agendamento. */
    async criarAgendamento(
        dadosAgendamento: Agendamento
    ) {

        try {

            if (
                !dadosAgendamento.usuarioId ||
                dadosAgendamento.usuarioId <= 0
            ) {
                throw new ErroHttp(
                    "O usuário é obrigatório.",
                    400
                );
            }

            if (
                !dadosAgendamento.clienteId ||
                dadosAgendamento.clienteId <= 0
            ) {
                throw new ErroHttp(
                    "O cliente é obrigatório.",
                    400
                );
            }

            if (
                !dadosAgendamento.profissionalId ||
                dadosAgendamento.profissionalId <= 0
            ) {
                throw new ErroHttp(
                    "O profissional é obrigatório.",
                    400
                );
            }

            if (!dadosAgendamento.dataServico) {
                throw new ErroHttp(
                    "A data do serviço é obrigatória.",
                    400
                );
            }

            if (!dadosAgendamento.horaInicio?.trim()) {
                throw new ErroHttp(
                    "A hora de início é obrigatória.",
                    400
                );
            }

            if (
                dadosAgendamento.horaFim &&
                dadosAgendamento.horaInicio >=
                dadosAgendamento.horaFim
            ) {
                throw new ErroHttp(
                    "A hora de início deve ser anterior à hora de fim.",
                    400
                );
            }

            /*
             * Validação do status.
             *
             * O enum possui:
             * AGENDADO
             * EM_ANDAMENTO
             * CONCLUIDO
             * CANCELADO
             */

            const statusPermitidos: StatusAgendamento[] = [
                "AGENDADO",
                "EM_ANDAMENTO",
                "CONCLUIDO",
                "CANCELADO"
            ];

            if (
                dadosAgendamento.status &&
                !statusPermitidos.includes(
                    dadosAgendamento.status
                )
            ) {
                throw new ErroHttp(
                    "Status de agendamento inválido.",
                    400
                );
            }

            /*
             * Verifica se o usuário existe.
             */
            const usuario =
                await prisma.usuario.findUnique({
                    where: {
                        id: dadosAgendamento.usuarioId
                    }
                });

            if (!usuario) {
                throw new ErroHttp(
                    "Usuário não encontrado.",
                    404
                );
            }

            /*
             * Verifica se o cliente existe.
             */
            const cliente =
                await prisma.cliente.findUnique({
                    where: {
                        id: dadosAgendamento.clienteId
                    }
                });

            if (!cliente) {
                throw new ErroHttp(
                    "Cliente não encontrado.",
                    404
                );
            }

            /*
             * Verifica se o profissional existe.
             */
            const profissional =
                await prisma.profissional.findUnique({
                    where: {
                        id: dadosAgendamento.profissionalId
                    }
                });

            if (!profissional) {
                throw new ErroHttp(
                    "Profissional não encontrado.",
                    404
                );
            }

            /*
             * Cria o agendamento.
             *
             * Se status não for informado,
             * o Prisma utilizará AGENDADO.
             */
            return await this.repository.criarAgendamento({

                usuarioId:
                    dadosAgendamento.usuarioId,

                clienteId:
                    dadosAgendamento.clienteId,

                profissionalId:
                    dadosAgendamento.profissionalId,

                dataServico:
                    new Date(
                        dadosAgendamento.dataServico
                    ),

                horaInicio:
                    dadosAgendamento.horaInicio,

                ...(dadosAgendamento.horaFim !== undefined && {
                    horaFim:
                        dadosAgendamento.horaFim
                }),

                ...(dadosAgendamento.observacoes !== undefined && {
                    observacoes:
                        dadosAgendamento.observacoes
                }),

                ...(dadosAgendamento.status !== undefined && {
                    status:
                        dadosAgendamento.status
                })
            });

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao criar agendamento: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao criar agendamento.",
                500
            );
        }
    }

    /* Atualiza um agendamento. */
    async atualizarAgendamento(
        idAgendamento: number,
        dadosAtualizados: Omit<
            Agendamento,
            "id" | "criadoEm" | "atualizadoEm"
        >
    ) {

        try {

            if (
                !idAgendamento ||
                idAgendamento <= 0
            ) {
                throw new ErroHttp(
                    "ID do agendamento inválido.",
                    400
                );
            }

            if (
                !dadosAtualizados.usuarioId ||
                dadosAtualizados.usuarioId <= 0
            ) {
                throw new ErroHttp(
                    "O usuário é obrigatório.",
                    400
                );
            }

            if (
                !dadosAtualizados.clienteId ||
                dadosAtualizados.clienteId <= 0
            ) {
                throw new ErroHttp(
                    "O cliente é obrigatório.",
                    400
                );
            }

            if (
                !dadosAtualizados.profissionalId ||
                dadosAtualizados.profissionalId <= 0
            ) {
                throw new ErroHttp(
                    "O profissional é obrigatório.",
                    400
                );
            }

            if (!dadosAtualizados.dataServico) {
                throw new ErroHttp(
                    "A data do serviço é obrigatória.",
                    400
                );
            }

            if (!dadosAtualizados.horaInicio?.trim()) {
                throw new ErroHttp(
                    "A hora de início é obrigatória.",
                    400
                );
            }

            if (
                dadosAtualizados.horaFim &&
                dadosAtualizados.horaInicio >=
                dadosAtualizados.horaFim
            ) {
                throw new ErroHttp(
                    "A hora de início deve ser anterior à hora de fim.",
                    400
                );
            }

            /*
             * Validação do status na atualização.
             */
            const statusPermitidos: StatusAgendamento[] = [
                "AGENDADO",
                "EM_ANDAMENTO",
                "CONCLUIDO",
                "CANCELADO"
            ];

            if (
                !statusPermitidos.includes(
                    dadosAtualizados.status
                )
            ) {
                throw new ErroHttp(
                    "Status de agendamento inválido.",
                    400
                );
            }

            return await this.repository
                .atualizarAgendamento(
                    idAgendamento,
                    dadosAtualizados
                );

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao atualizar agendamento: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao atualizar agendamento.",
                500
            );
        }
    }

    /* Exclui um agendamento. */
    async deletarAgendamento(
        idAgendamento: number
    ) {

        try {

            if (
                !idAgendamento ||
                idAgendamento <= 0
            ) {
                throw new ErroHttp(
                    "ID do agendamento inválido.",
                    400
                );
            }

            return await this.repository
                .deletarAgendamento(
                    idAgendamento
                );

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao deletar agendamento: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao deletar agendamento.",
                500
            );
        }
    }
}

export const agendamentoService = new AgendamentoService( agendamentoRepository );
