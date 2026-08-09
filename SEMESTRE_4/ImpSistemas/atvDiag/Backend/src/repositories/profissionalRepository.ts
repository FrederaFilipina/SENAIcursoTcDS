import type {
    PrismaClient,
    Profissional
} from "../prisma/generated/prisma/client";

import { prisma } from "../prisma/prisma";

export class ProfissionalRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    /* Lista todos os profissionais. */
    async listarTdsProfissionais() {

        return await this.prisma.profissional.findMany({
            orderBy: {
                id: "asc"
            }
        });
    }

    /* Busca um profissional pelo ID. */
    async buscarProfissionalId(idProfissional: number) {

        return await this.prisma.profissional.findUnique({
            where: {
                id: idProfissional
            }
        });
    }

    /* Cria um novo profissional. */
    async criarProfissional(
        dadosProfissional: Partial<Profissional>
    ) {

        if (!dadosProfissional.nome) {
            throw new Error(
                "O nome do profissional é obrigatório."
            );
        }

        if (!dadosProfissional.telefone) {
            throw new Error(
                "O telefone do profissional é obrigatório."
            );
        }

        return await this.prisma.profissional.create({
            data: {
                nome: dadosProfissional.nome,
                telefone: dadosProfissional.telefone,
                ...(dadosProfissional.status !== undefined && {
                    status: dadosProfissional.status
                })
            }
        });
    }

    /* Atualiza os dados de um profissional. */
    async atualizarProfissional(
        idProfissional: number,
        dadosAtualizados: Omit<
            Profissional,
            "id" | "criadoEm" | "atualizadoEm"
        >
    ) {

        const profissionalExistente =
            await this.prisma.profissional.findUnique({
                where: {
                    id: idProfissional
                }
            });

        if (!profissionalExistente) {
            throw new Error(
                "Profissional não encontrado."
            );
        }

        return await this.prisma.profissional.update({
            where: {
                id: idProfissional
            },
            data: {
                nome: dadosAtualizados.nome,
                telefone: dadosAtualizados.telefone,
                status: dadosAtualizados.status
            }
        });
    }

    /* Exclui um profissional. */
    async deletarProfissional(
        idProfissional: number
    ) {

        const profissionalExistente =
            await this.prisma.profissional.findUnique({
                where: {
                    id: idProfissional
                }
            });

        if (!profissionalExistente) {
            throw new Error(
                "Profissional não encontrado."
            );
        }

        return await this.prisma.profissional.delete({
            where: {
                id: idProfissional
            }
        });
    }
}

export const profissionalRepository =
    new ProfissionalRepository(prisma);