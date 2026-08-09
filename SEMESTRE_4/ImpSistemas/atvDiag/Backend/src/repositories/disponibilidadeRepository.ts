import type { Disponibilidade, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class DisponibilidadeRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    /* Lista todas as disponibilidades. */
    async listarTdsDisponibilidades() {

        return await this.prisma.disponibilidade.findMany({
            orderBy: {
                data: "asc"
            },
            include: {
                profissional: true
            }
        });
    }

    /* Busca uma disponibilidade pelo ID. */
    async buscarDisponibilidadeId(
        idDisponibilidade: number
    ) {

        return await this.prisma.disponibilidade.findUnique({
            where: {
                id: idDisponibilidade
            },
            include: {
                profissional: true
            }
        });
    }

    /* Lista as disponibilidades de um profissional. */
    async listarDisponibilidadesProfissional(
        profissionalId: number
    ) {

        return await this.prisma.disponibilidade.findMany({
            where: {
                profissionalId
            },
            orderBy: {
                data: "asc"
            },
            include: {
                profissional: true
            }
        });
    }

    /* Cria uma nova disponibilidade. */
    async criarDisponibilidade(
        dadosDisponibilidade: Partial<Disponibilidade>
    ) {

        if (!dadosDisponibilidade.profissionalId) {
            throw new Error(
                "O profissional é obrigatório."
            );
        }

        if (!dadosDisponibilidade.data) {
            throw new Error(
                "A data da disponibilidade é obrigatória."
            );
        }

        if (!dadosDisponibilidade.horaInicio) {
            throw new Error(
                "A hora de início é obrigatória."
            );
        }

        if (!dadosDisponibilidade.horaFim) {
            throw new Error(
                "A hora de fim é obrigatória."
            );
        }

        return await this.prisma.disponibilidade.create({
            data: {
                profissionalId:
                    dadosDisponibilidade.profissionalId,

                data: new Date(
                    dadosDisponibilidade.data
                ),

                horaInicio:
                    dadosDisponibilidade.horaInicio,

                horaFim:
                    dadosDisponibilidade.horaFim,

                ...(dadosDisponibilidade.disponivel !== undefined && {
                    disponivel:
                        dadosDisponibilidade.disponivel
                })
            },
            include: {
                profissional: true
            }
        });
    }

    /* Atualiza uma disponibilidade. */
    async atualizarDisponibilidade(
        idDisponibilidade: number,
        dadosAtualizados: Omit<
            Disponibilidade,
            "id" | "criadoEm" | "atualizadoEm"
        >
    ) {

        const disponibilidadeExistente =
            await this.prisma.disponibilidade.findUnique({
                where: {
                    id: idDisponibilidade
                }
            });

        if (!disponibilidadeExistente) {
            throw new Error(
                "Disponibilidade não encontrada."
            );
        }

        return await this.prisma.disponibilidade.update({
            where: {
                id: idDisponibilidade
            },
            data: {
                profissionalId:
                    dadosAtualizados.profissionalId,

                data: new Date(
                    dadosAtualizados.data
                ),

                horaInicio:
                    dadosAtualizados.horaInicio,

                horaFim:
                    dadosAtualizados.horaFim,

                disponivel:
                    dadosAtualizados.disponivel
            },
            include: {
                profissional: true
            }
        });
    }

    /* Exclui uma disponibilidade. */
    async deletarDisponibilidade(
        idDisponibilidade: number
    ) {

        const disponibilidadeExistente =
            await this.prisma.disponibilidade.findUnique({
                where: {
                    id: idDisponibilidade
                }
            });

        if (!disponibilidadeExistente) {
            throw new Error(
                "Disponibilidade não encontrada."
            );
        }

        return await this.prisma.disponibilidade.delete({
            where: {
                id: idDisponibilidade
            },
            include: {
                profissional: true
            }
        });
    }
}

export const disponibilidadeRepository = new DisponibilidadeRepository(prisma);