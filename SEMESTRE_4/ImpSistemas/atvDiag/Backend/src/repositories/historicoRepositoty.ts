import type { Historico, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";


export class HistoricoRepository {


    constructor(
        private readonly prisma: PrismaClient
    ) {
        this.prisma = prisma;
    }



    /* Lista todos os históricos */
    async listarTdsHistoricos() {

        return await this.prisma.historico.findMany({

            orderBy: {
                dataHora: "desc"
            },

            include: {
                usuario: true
            }

        });

    }




    /* Busca histórico pelo ID */
    async buscarHistoricoId(
        idHistorico: number
    ) {


        return await this.prisma.historico.findUnique({

            where: {
                id: idHistorico
            },

            include: {
                usuario: true
            }

        });

    }





    /* Lista históricos de um usuário */
    async listarHistoricosUsuario(
        usuarioId: number
    ) {


        return await this.prisma.historico.findMany({

            where: {
                usuarioId
            },

            orderBy: {
                dataHora: "desc"
            },

            include: {
                usuario: true
            }

        });

    }






    /* Cria um histórico */
    async criarHistorico(
        dadosHistorico: Partial<Historico>
    ) {


        if (!dadosHistorico.usuarioId) {

            throw new Error(
                "O usuário é obrigatório."
            );

        }


        if (
            !dadosHistorico.descricao ||
            dadosHistorico.descricao.trim() === ""
        ) {

            throw new Error(
                "A descrição do histórico é obrigatória."
            );

        }



        return await this.prisma.historico.create({

            data: {

                usuarioId:
                    dadosHistorico.usuarioId,


                descricao:
                    dadosHistorico.descricao,


                ...(dadosHistorico.dataHora !== undefined && {

                    dataHora:
                        new Date(
                            dadosHistorico.dataHora
                        )

                })

            },

            include: {

                usuario: true

            }

        });

    }







    /* Atualiza histórico */
    async atualizarHistorico(
        idHistorico: number,
        dadosAtualizados: Omit<
            Historico,
            "id" | "criadoEm"
        >
    ) {


        return await this.prisma.historico.update({

            where: {

                id: idHistorico

            },


            data: {

                usuarioId:
                    dadosAtualizados.usuarioId,


                descricao:
                    dadosAtualizados.descricao,


                dataHora:
                    new Date(
                        dadosAtualizados.dataHora
                    )

            },


            include: {

                usuario: true

            }

        });

    }







    /* Deleta histórico */
    async deletarHistorico(
        idHistorico: number
    ) {


        return await this.prisma.historico.delete({

            where: {

                id: idHistorico

            },


            include: {

                usuario: true

            }

        });

    }

}



export const historicoRepository = new HistoricoRepository(prisma);