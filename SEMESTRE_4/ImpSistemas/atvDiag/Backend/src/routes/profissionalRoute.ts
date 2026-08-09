import { Router } from "express";
import { profissionalController } from "../controllers/profissionalController";

export const profissionalRouter = Router();

profissionalRouter.get(
    "/profissionais",
    async (req, res) => {
        return profissionalController.listarTdsProfissionais(
            req,
            res
        );
    }
);

profissionalRouter.get(
    "/profissionais/:id",
    async (req, res) => {
        return profissionalController.buscarProfissionalId(
            req,
            res
        );
    }
);

profissionalRouter.post(
    "/profissionais",
    async (req, res) => {
        return profissionalController.criarProfissional(
            req,
            res
        );
    }
);

profissionalRouter.put(
    "/profissionais/:id",
    async (req, res) => {
        return profissionalController.atualizarProfissional(
            req,
            res
        );
    }
);

profissionalRouter.delete(
    "/profissionais/:id",
    async (req, res) => {
        return profissionalController.deletarProfissional(
            req,
            res
        );
    }
);