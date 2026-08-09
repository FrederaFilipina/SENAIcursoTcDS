import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";

export const usuarioRouter = Router();

usuarioRouter.get("/usuarios", async (req, res) => {
    return usuarioController.listarTdsUsuarios(req, res);
});

usuarioRouter.get("/usuarios/:id", async (req, res) => {
    return usuarioController.buscarUsuarioId(req, res);
});

usuarioRouter.get("/usuarios/email/:email", async (req, res) => {
    return usuarioController.buscarUsuarioEmail(req, res);
});

usuarioRouter.post("/usuarios", async (req, res) => {
    return usuarioController.criarUsuario(req, res);
});

usuarioRouter.put("/usuarios/:id", async (req, res) => {
    return usuarioController.atualizarUsuario(req, res);
});

usuarioRouter.delete("/usuarios/:id", async (req, res) => {
    return usuarioController.deletarUsuario(req, res);
});