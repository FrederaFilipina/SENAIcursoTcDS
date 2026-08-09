import { Router } from "express";
import { historicoController } from "../controllers/historicoController";


export const historicoRouter = Router();



historicoRouter.get(
    "/historicos",
    async (req, res) => {

        return historicoController
            .listarTdsHistoricos(
                req,
                res
            );

    }
);



historicoRouter.get(
    "/historicos/:id",
    async (req, res) => {

        return historicoController
            .buscarHistoricoId(
                req,
                res
            );

    }
);



historicoRouter.get(
    "/historicos/usuario/:usuarioId",
    async (req, res) => {

        return historicoController
            .listarHistoricosUsuario(
                req,
                res
            );

    }
);



historicoRouter.post(
    "/historicos",
    async (req, res) => {

        return historicoController
            .criarHistorico(
                req,
                res
            );

    }
);