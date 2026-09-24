import { Router } from "express";
import {lista, deleta} from "../controllers/materials.js";
import { authenticate, requireRole } from "../middlewares/auth.js";

const routerMaterials = Router()

routerMaterials.use(authenticate)

routerMaterials.get("/listar", lista)

routerMaterials.delete("/:id", requireRole("admin"), deleta );

export default routerMaterials;