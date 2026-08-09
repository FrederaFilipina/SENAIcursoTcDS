import { Router } from "express";

import {
    agendamentoController
} from "../controllers/agendamentoController";

export const agendamentoRouter = Router();

agendamentoRouter.get(
    "/agendamentos",
    async (req, res) => {
        return agendamentoController
            .listarTdsAgendamentos(req, res);
    }
);

agendamentoRouter.get(
    "/agendamentos/:id",
    async (req, res) => {
        return agendamentoController
            .buscarAgendamentoId(req, res);
    }
);

agendamentoRouter.get(
    "/agendamentos/cliente/:clienteId",
    async (req, res) => {
        return agendamentoController
            .listarAgendamentosCliente(
                req,
                res
            );
    }
);

agendamentoRouter.get(
    "/agendamentos/profissional/:profissionalId",
    async (req, res) => {
        return agendamentoController
            .listarAgendamentosProfissional(
                req,
                res
            );
    }
);

agendamentoRouter.get(
    "/agendamentos/usuario/:usuarioId",
    async (req, res) => {
        return agendamentoController
            .listarAgendamentosUsuario(
                req,
                res
            );
    }
);

agendamentoRouter.post(
    "/agendamentos",
    async (req, res) => {
        return agendamentoController
            .criarAgendamento(req, res);
    }
);

agendamentoRouter.put(
    "/agendamentos/:id",
    async (req, res) => {
        return agendamentoController
            .atualizarAgendamento(
                req,
                res
            );
    }
);

agendamentoRouter.delete(
    "/agendamentos/:id",
    async (req, res) => {
        return agendamentoController
            .deletarAgendamento(
                req,
                res
            );
    }
);