import type { Request, Response } from "express";
import { historicoService, type HistoricoService } from "../services/historicoService";
import type { Historico } from "../prisma/generated/prisma/client";
import { ErroHttp } from "../errors/erroHttp";


export class HistoricoController {


    constructor(
        private readonly service: HistoricoService
    ) {

        this.service = service;

    }





    async listarTdsHistoricos(
        req: Request,
        res: Response
    ) {

        try {


            const historicos =
                await this.service
                    .listarTdsHistoricos();


            return res.status(200)
                .json(historicos);



        } catch (error) {


            if (error instanceof ErroHttp) {

                return res.status(
                    error.statusCode
                ).json({

                    error: error.message

                });

            }


            return res.status(500)
                .json({

                    error:
                        "Erro interno do servidor."

                });

        }

    }






    async buscarHistoricoId(
        req: Request,
        res: Response
    ) {

        try {


            const id =
                Number(req.params.id);


            const historico =
                await this.service
                    .buscarHistoricoId(id);



            return res.status(200)
                .json(historico);



        } catch (error) {


            if (error instanceof ErroHttp) {

                return res.status(
                    error.statusCode
                ).json({

                    error: error.message

                });

            }


            return res.status(500)
                .json({

                    error:
                        "Erro interno do servidor."

                });

        }

    }







    async criarHistorico(
        req: Request,
        res: Response
    ) {

        try {


            const dados =
                req.body as Historico;



            const historico =
                await this.service
                    .criarHistorico(dados);



            return res.status(201)
                .json(historico);



        } catch (error) {


            if (error instanceof ErroHttp) {

                return res.status(
                    error.statusCode
                ).json({

                    error: error.message

                });

            }


            return res.status(500)
                .json({

                    error:
                        "Erro interno do servidor."

                });

        }

    }

    async listarHistoricosUsuario(
        req: Request,
        res: Response
    ) {

        try {

            const usuarioId = Number(req.params.usuarioId);


            const historicos =
                await this.service.listarHistoricosUsuario(
                    usuarioId
                );


            return res.status(200).json(historicos);


        } catch (error) {


            if (error instanceof ErroHttp) {

                return res.status(
                    error.statusCode
                ).json({
                    error: error.message
                });

            }


            return res.status(500).json({

                error:
                    "Erro interno do servidor."

            });

        }
    }


}



export const historicoController = new HistoricoController(historicoService);