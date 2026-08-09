import type { Historico } from "../prisma/generated/prisma/client";
import { historicoRepository, type HistoricoRepository } from "../repositories/historicoRepositoty";
import { ErroHttp } from "../errors/erroHttp";



export class HistoricoService {


    constructor(
        private readonly repository: HistoricoRepository
    ) {

        this.repository = repository;

    }






    async listarTdsHistoricos() {

        try {


            return await this.repository
                .listarTdsHistoricos();



        } catch(error) {


            if(error instanceof ErroHttp){
                throw error;
            }


            throw new ErroHttp(
                "Erro ao listar históricos.",
                500
            );

        }

    }








    async buscarHistoricoId(
        idHistorico:number
    ){


        try{


            if(
                !idHistorico ||
                idHistorico <= 0
            ){

                throw new ErroHttp(
                    "ID do histórico inválido.",
                    400
                );

            }




            const historico =
                await this.repository
                    .buscarHistoricoId(
                        idHistorico
                    );




            if(!historico){

                throw new ErroHttp(
                    "Histórico não encontrado.",
                    404
                );

            }




            return historico;




        }catch(error){


            if(error instanceof ErroHttp){
                throw error;
            }


            throw new ErroHttp(
                "Erro ao buscar histórico.",
                500
            );

        }

    }







    async listarHistoricosUsuario(
        usuarioId:number
    ){


        try{


            if(
                !usuarioId ||
                usuarioId <=0
            ){

                throw new ErroHttp(
                    "ID do usuário inválido.",
                    400
                );

            }



            return await this.repository
                .listarHistoricosUsuario(
                    usuarioId
                );



        }catch(error){


            if(error instanceof ErroHttp){
                throw error;
            }


            throw new ErroHttp(
                "Erro ao listar históricos do usuário.",
                500
            );

        }

    }








    async criarHistorico(
        dadosHistorico: Historico
    ){


        try{


            if(
                !dadosHistorico.usuarioId
            ){

                throw new ErroHttp(
                    "Usuário obrigatório.",
                    400
                );

            }



            if(
                !dadosHistorico.descricao ||
                dadosHistorico.descricao.trim()===""
            ){

                throw new ErroHttp(
                    "Descrição obrigatória.",
                    400
                );

            }



            return await this.repository
                .criarHistorico(
                    dadosHistorico
                );



        }catch(error){


            if(error instanceof ErroHttp){
                throw error;
            }


            throw new ErroHttp(
                "Erro ao criar histórico.",
                500
            );

        }

    }







    async atualizarHistorico(
        idHistorico:number,
        dadosAtualizados:Omit<
            Historico,
            "id"|"criadoEm"
        >
    ){


        try{


            if(
                !idHistorico ||
                idHistorico<=0
            ){

                throw new ErroHttp(
                    "ID inválido.",
                    400
                );

            }



            return await this.repository
                .atualizarHistorico(
                    idHistorico,
                    dadosAtualizados
                );



        }catch(error){


            if(error instanceof ErroHttp){
                throw error;
            }


            throw new ErroHttp(
                "Erro ao atualizar histórico.",
                500
            );

        }

    }







    async deletarHistorico(
        idHistorico:number
    ){


        try{


            if(
                !idHistorico ||
                idHistorico<=0
            ){

                throw new ErroHttp(
                    "ID inválido.",
                    400
                );

            }



            return await this.repository
                .deletarHistorico(
                    idHistorico
                );



        }catch(error){


            if(error instanceof ErroHttp){
                throw error;
            }


            throw new ErroHttp(
                "Erro ao deletar histórico.",
                500
            );

        }

    }

}



export const historicoService = new HistoricoService( historicoRepository );