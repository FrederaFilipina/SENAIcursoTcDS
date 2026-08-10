import express from "express";
import cors from "cors";

import { clienteRouter } from "./routes/clienteRoute";
import { profissionalRouter } from "./routes/profissionalRoute";
import { agendamentoRouter } from "./routes/agendamentoRoute";
import { usuarioRouter } from "./routes/usuarioRoute";
import { historicoRouter } from "./routes/historicoRoute";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use(clienteRouter);
app.use(profissionalRouter);
app.use(agendamentoRouter);
app.use(usuarioRouter);
app.use(historicoRouter);

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});