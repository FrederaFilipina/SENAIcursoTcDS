import { Router } from "express";
import { clienteController } from "../controllers/clienteController";

export const clienteRouter = Router();

clienteRouter.get("/clientes", async (req, res) => {
    return clienteController.listarTdsClientes(req, res);
});

clienteRouter.get("/clientes/:id", async (req, res) => {
    return clienteController.buscarClienteId(req, res);
});

clienteRouter.post("/clientes", async (req, res) => {
    return clienteController.criarCliente(req, res);
});

clienteRouter.put("/clientes/:id", async (req, res) => {
    return clienteController.atualizarCliente(req, res);
});

clienteRouter.delete("/clientes/:id", async (req, res) => {
    return clienteController.deletarCliente(req, res);
});