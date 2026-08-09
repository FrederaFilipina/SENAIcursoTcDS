import type { Profissional, StatusProfissional } from "../prisma/generated/prisma/client";
import { profissionalRepository, type ProfissionalRepository } from "../repositories/profissionalRepository";
import { ErroHttp } from "../errors/erroHttp";


export class ProfissionalService {

    constructor(
        private readonly repository: ProfissionalRepository
    ) {
        this.repository = repository;
    }


    /* Lista todos os profissionais */
    async listarTdsProfissionais() {

        try {

            return await this.repository
                .listarTdsProfissionais();

        } catch (error) {

            if (error instanceof ErroHttp) {
                throw error;
            }

            if (error instanceof Error) {

                throw new ErroHttp(
                    `Erro ao listar profissionais: ${error.message}`,
                    500
                );
            }

            throw new ErroHttp(
                "Erro desconhecido ao listar profissionais.",
                500
            );
        }
    }


    /* Busca profissional por ID */
    async buscarProfissionalId(
        idProfissional: number
    ) {

        try {

            if (
                !idProfissional ||
                idProfissional <= 0
            ) {

                throw new ErroHttp(
                    "ID do profissional inválido.",
                    400
                );
            }


            const profissional =
                await this.repository
                    .buscarProfissionalId(
                        idProfissional
                    );


            if (!profissional) {

                throw new ErroHttp(
                    "Profissional não encontrado.",
                    404
                );
            }


            return profissional;


        } catch (error) {


            if (error instanceof ErroHttp) {
                throw error;
            }


            if (error instanceof Error) {

                throw new ErroHttp(
                    `Erro ao buscar profissional: ${error.message}`,
                    500
                );
            }


            throw new ErroHttp(
                "Erro desconhecido ao buscar profissional.",
                500
            );
        }
    }



    /* Cria profissional */
    async criarProfissional(
        dadosProfissional: Profissional
    ) {

        try {


            if (
                !dadosProfissional.nome ||
                dadosProfissional.nome.trim() === ""
            ) {

                throw new ErroHttp(
                    "O nome do profissional é obrigatório.",
                    400
                );
            }


            if (
                !dadosProfissional.telefone ||
                dadosProfissional.telefone.trim() === ""
            ) {

                throw new ErroHttp(
                    "O telefone do profissional é obrigatório.",
                    400
                );
            }



            const statusPermitidos: StatusProfissional[] = [

                "DISPONIVEL",
                "OCUPADO",
                "FERIAS",
                "AFASTADO"

            ];



            if (
                dadosProfissional.status !== undefined &&
                !statusPermitidos.includes(
                    dadosProfissional.status
                )
            ) {

                throw new ErroHttp(
                    "Status do profissional inválido.",
                    400
                );
            }



            return await this.repository
                .criarProfissional({

                    nome:
                        dadosProfissional.nome,

                    telefone:
                        dadosProfissional.telefone,


                    ...(dadosProfissional.status !== undefined && {

                        status:
                            dadosProfissional.status

                    })

                });



        } catch (error) {


            if (error instanceof ErroHttp) {
                throw error;
            }


            if (error instanceof Error) {

                throw new ErroHttp(
                    `Erro ao criar profissional: ${error.message}`,
                    500
                );
            }


            throw new ErroHttp(
                "Erro desconhecido ao criar profissional.",
                500
            );
        }
    }



    /* Atualiza profissional */
    async atualizarProfissional(
        idProfissional: number,
        dadosAtualizados: Omit<
            Profissional,
            "id" | "criadoEm" | "atualizadoEm"
        >
    ) {

        try {


            if (
                !idProfissional ||
                idProfissional <= 0
            ) {

                throw new ErroHttp(
                    "ID do profissional inválido.",
                    400
                );
            }



            if (
                !dadosAtualizados.nome ||
                dadosAtualizados.nome.trim() === ""
            ) {

                throw new ErroHttp(
                    "O nome do profissional é obrigatório.",
                    400
                );
            }



            if (
                !dadosAtualizados.telefone ||
                dadosAtualizados.telefone.trim() === ""
            ) {

                throw new ErroHttp(
                    "O telefone do profissional é obrigatório.",
                    400
                );
            }



            const statusPermitidos: StatusProfissional[] = [

                "DISPONIVEL",
                "OCUPADO",
                "FERIAS",
                "AFASTADO"

            ];



            if (
                !statusPermitidos.includes(
                    dadosAtualizados.status
                )
            ) {

                throw new ErroHttp(
                    "Status do profissional inválido.",
                    400
                );
            }



            return await this.repository
                .atualizarProfissional(
                    idProfissional,
                    dadosAtualizados
                );



        } catch (error) {


            if (error instanceof ErroHttp) {
                throw error;
            }


            if (error instanceof Error) {

                throw new ErroHttp(
                    `Erro ao atualizar profissional: ${error.message}`,
                    500
                );
            }


            throw new ErroHttp(
                "Erro desconhecido ao atualizar profissional.",
                500
            );
        }
    }




    /* Deleta profissional */
    async deletarProfissional(
        idProfissional: number
    ) {

        try {


            if (
                !idProfissional ||
                idProfissional <= 0
            ) {

                throw new ErroHttp(
                    "ID do profissional inválido.",
                    400
                );
            }



            return await this.repository
                .deletarProfissional(
                    idProfissional
                );



        } catch (error) {


            if (error instanceof ErroHttp) {
                throw error;
            }


            if (error instanceof Error) {

                throw new ErroHttp(
                    `Erro ao deletar profissional: ${error.message}`,
                    500
                );
            }


            throw new ErroHttp(
                "Erro desconhecido ao deletar profissional.",
                500
            );
        }
    }

}



export const profissionalService =
    new ProfissionalService(
        profissionalRepository
    );