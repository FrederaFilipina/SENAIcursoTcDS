import { Router } from "express";
import { disponibilidadeController } from "../controllers/disponibilidadeController";

export const disponibilidadeRouter = Router();

disponibilidadeRouter.get(
    "/disponibilidades",
    async (req, res) => {
        return disponibilidadeController
            .listarTdsDisponibilidades(req, res);
    }
);

disponibilidadeRouter.get(
    "/disponibilidades/:id",
    async (req, res) => {
        return disponibilidadeController
            .buscarDisponibilidadeId(req, res);
    }
);

disponibilidadeRouter.get(
    "/disponibilidades/profissional/:profissionalId",
    async (req, res) => {
        return disponibilidadeController
            .listarDisponibilidadesProfissional(
                req,
                res
            );
    }
);

disponibilidadeRouter.post(
    "/disponibilidades",
    async (req, res) => {
        return disponibilidadeController
            .criarDisponibilidade(req, res);
    }
);

disponibilidadeRouter.put(
    "/disponibilidades/:id",
    async (req, res) => {
        return disponibilidadeController
            .atualizarDisponibilidade(
                req,
                res
            );
    }
);

disponibilidadeRouter.delete(
    "/disponibilidades/:id",
    async (req, res) => {
        return disponibilidadeController
            .deletarDisponibilidade(
                req,
                res
            );
    }
);