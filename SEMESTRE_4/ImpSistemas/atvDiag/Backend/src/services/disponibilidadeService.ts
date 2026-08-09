import type { Disponibilidade } from "../prisma/generated/prisma/client";
import { disponibilidadeRepository, type DisponibilidadeRepository } from "../repositories/disponibilidadeRepository";
import { ErroHttp } from "../errors/erroHttp";

export class DisponibilidadeService {

    constructor(
        private readonly repository: DisponibilidadeRepository
    ) {
        this.repository = repository;
    }

    /* Lista todas as disponibilidades. */
    async listarTdsDisponibilidades() {

        try {

            return await this.repository
                .listarTdsDisponibilidades();

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao listar disponibilidades: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao listar disponibilidades.",
                500
            );
        }
    }

    /* Busca uma disponibilidade pelo ID. */
    async buscarDisponibilidadeId(
        idDisponibilidade: number
    ) {

        try {

            if (
                !idDisponibilidade ||
                idDisponibilidade <= 0
            ) {
                throw new ErroHttp(
                    "ID da disponibilidade inválido.",
                    400
                );
            }

            const disponibilidade =
                await this.repository.buscarDisponibilidadeId(
                    idDisponibilidade
                );

            if (!disponibilidade) {
                throw new ErroHttp(
                    "Disponibilidade não encontrada.",
                    404
                );
            }

            return disponibilidade;

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao buscar disponibilidade: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao buscar disponibilidade.",
                500
            );
        }
    }

    /* Lista as disponibilidades de um profissional. */
    async listarDisponibilidadesProfissional(
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
                .listarDisponibilidadesProfissional(
                    profissionalId
                );

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao listar disponibilidades do profissional: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao listar disponibilidades do profissional.",
                500
            );
        }
    }

    /* Cria uma nova disponibilidade. */
    async criarDisponibilidade(
        dadosDisponibilidade: Disponibilidade
    ) {

        try {

            if (
                !dadosDisponibilidade.profissionalId ||
                dadosDisponibilidade.profissionalId <= 0
            ) {
                throw new ErroHttp(
                    "O profissional é obrigatório.",
                    400
                );
            }

            if (!dadosDisponibilidade.data) {
                throw new ErroHttp(
                    "A data da disponibilidade é obrigatória.",
                    400
                );
            }

            if (!dadosDisponibilidade.horaInicio?.trim()) {
                throw new ErroHttp(
                    "A hora de início é obrigatória.",
                    400
                );
            }

            if (!dadosDisponibilidade.horaFim?.trim()) {
                throw new ErroHttp(
                    "A hora de fim é obrigatória.",
                    400
                );
            }

            if (
                dadosDisponibilidade.horaInicio >=
                dadosDisponibilidade.horaFim
            ) {
                throw new ErroHttp(
                    "A hora de início deve ser anterior à hora de fim.",
                    400
                );
            }

            return await this.repository.criarDisponibilidade({
                profissionalId:
                    dadosDisponibilidade.profissionalId,

                data:
                    new Date(dadosDisponibilidade.data),

                horaInicio:
                    dadosDisponibilidade.horaInicio,

                horaFim:
                    dadosDisponibilidade.horaFim,

                disponivel:
                    dadosDisponibilidade.disponivel
            });

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao criar disponibilidade: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao criar disponibilidade.",
                500
            );
        }
    }

    /* Atualiza uma disponibilidade. */
    async atualizarDisponibilidade(
        idDisponibilidade: number,
        dadosAtualizados: Omit<
            Disponibilidade,
            "id" | "criadoEm" | "atualizadoEm"
        >
    ) {

        try {

            if (
                !idDisponibilidade ||
                idDisponibilidade <= 0
            ) {
                throw new ErroHttp(
                    "ID da disponibilidade inválido.",
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

            if (!dadosAtualizados.data) {
                throw new ErroHttp(
                    "A data da disponibilidade é obrigatória.",
                    400
                );
            }

            if (!dadosAtualizados.horaInicio?.trim()) {
                throw new ErroHttp(
                    "A hora de início é obrigatória.",
                    400
                );
            }

            if (!dadosAtualizados.horaFim?.trim()) {
                throw new ErroHttp(
                    "A hora de fim é obrigatória.",
                    400
                );
            }

            if (
                dadosAtualizados.horaInicio >=
                dadosAtualizados.horaFim
            ) {
                throw new ErroHttp(
                    "A hora de início deve ser anterior à hora de fim.",
                    400
                );
            }

            return await this.repository
                .atualizarDisponibilidade(
                    idDisponibilidade,
                    dadosAtualizados
                );

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao atualizar disponibilidade: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao atualizar disponibilidade.",
                500
            );
        }
    }

    /* Exclui uma disponibilidade. */
    async deletarDisponibilidade(
        idDisponibilidade: number
    ) {

        try {

            if (
                !idDisponibilidade ||
                idDisponibilidade <= 0
            ) {
                throw new ErroHttp(
                    "ID da disponibilidade inválido.",
                    400
                );
            }

            return await this.repository
                .deletarDisponibilidade(
                    idDisponibilidade
                );

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {
                throw new ErroHttp(
                    `Erro ao deletar disponibilidade: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao deletar disponibilidade.",
                500
            );
        }
    }
}

export const disponibilidadeService = new DisponibilidadeService( disponibilidadeRepository );