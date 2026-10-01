import express from "express";
import cors from "cors";

import authRouter from "./src/routers/auth.js";
import materialsRouter from "./src/routers/materials.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRouter);
app.use("/api/materials", materialsRouter);

export default app;