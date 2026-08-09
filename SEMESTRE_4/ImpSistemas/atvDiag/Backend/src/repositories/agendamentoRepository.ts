import type { Agendamento, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class AgendamentoRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    /* Lista todos os agendamentos. */
    async listarTdsAgendamentos() {

        return await this.prisma.agendamento.findMany({
            orderBy: {
                dataServico: "asc"
            },
            include: {
                usuario: true,
                cliente: true,
                profissional: true
            }
        });
    }

    /* Busca um agendamento pelo ID. */
    async buscarAgendamentoId(
        idAgendamento: number
    ) {

        return await this.prisma.agendamento.findUnique({
            where: {
                id: idAgendamento
            },
            include: {
                usuario: true,
                cliente: true,
                profissional: true
            }
        });
    }

    /* Lista os agendamentos de um cliente. */
    async listarAgendamentosCliente(
        clienteId: number
    ) {

        return await this.prisma.agendamento.findMany({
            where: {
                clienteId
            },
            orderBy: {
                dataServico: "asc"
            },
            include: {
                usuario: true,
                cliente: true,
                profissional: true
            }
        });
    }

    /* Lista os agendamentos de um profissional. */
    async listarAgendamentosProfissional(
        profissionalId: number
    ) {

        return await this.prisma.agendamento.findMany({
            where: {
                profissionalId
            },
            orderBy: {
                dataServico: "asc"
            },
            include: {
                usuario: true,
                cliente: true,
                profissional: true
            }
        });
    }

    /* Lista os agendamentos de um usuário. */
    async listarAgendamentosUsuario(
        usuarioId: number
    ) {

        return await this.prisma.agendamento.findMany({
            where: {
                usuarioId
            },
            orderBy: {
                dataServico: "asc"
            },
            include: {
                usuario: true,
                cliente: true,
                profissional: true
            }
        });
    }

    /* Cria um novo agendamento. */
    async criarAgendamento(
        dadosAgendamento: Partial<Agendamento>
    ) {

        if (!dadosAgendamento.usuarioId) {
            throw new Error(
                "O usuário é obrigatório."
            );
        }

        if (!dadosAgendamento.clienteId) {
            throw new Error(
                "O cliente é obrigatório."
            );
        }

        if (!dadosAgendamento.profissionalId) {
            throw new Error(
                "O profissional é obrigatório."
            );
        }

        if (!dadosAgendamento.dataServico) {
            throw new Error(
                "A data do serviço é obrigatória."
            );
        }

        if (!dadosAgendamento.horaInicio) {
            throw new Error(
                "A hora de início é obrigatória."
            );
        }

        return await this.prisma.agendamento.create({
            data: {
                usuarioId:
                    dadosAgendamento.usuarioId,

                clienteId:
                    dadosAgendamento.clienteId,

                profissionalId:
                    dadosAgendamento.profissionalId,

                dataServico: new Date(
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
            },
            include: {
                usuario: true,
                cliente: true,
                profissional: true
            }
        });
    }

    /* Atualiza um agendamento. */
    async atualizarAgendamento(
        idAgendamento: number,
        dadosAtualizados: Omit<
            Agendamento,
            "id" | "criadoEm" | "atualizadoEm"
        >
    ) {

        const agendamentoExistente =
            await this.prisma.agendamento.findUnique({
                where: {
                    id: idAgendamento
                }
            });

        if (!agendamentoExistente) {
            throw new Error(
                "Agendamento não encontrado."
            );
        }

        return await this.prisma.agendamento.update({
            where: {
                id: idAgendamento
            },
            data: {
                usuarioId:
                    dadosAtualizados.usuarioId,

                clienteId:
                    dadosAtualizados.clienteId,

                profissionalId:
                    dadosAtualizados.profissionalId,

                dataServico: new Date(
                    dadosAtualizados.dataServico
                ),

                horaInicio:
                    dadosAtualizados.horaInicio,

                horaFim:
                    dadosAtualizados.horaFim,

                observacoes:
                    dadosAtualizados.observacoes,

                status:
                    dadosAtualizados.status
            },
            include: {
                usuario: true,
                cliente: true,
                profissional: true
            }
        });
    }

    /* Exclui um agendamento. */
    async deletarAgendamento(
        idAgendamento: number
    ) {

        const agendamentoExistente =
            await this.prisma.agendamento.findUnique({
                where: {
                    id: idAgendamento
                }
            });

        if (!agendamentoExistente) {
            throw new Error(
                "Agendamento não encontrado."
            );
        }

        return await this.prisma.agendamento.delete({
            where: {
                id: idAgendamento
            },
            include: {
                usuario: true,
                cliente: true,
                profissional: true
            }
        });
    }
}

export const agendamentoRepository = new AgendamentoRepository(prisma);