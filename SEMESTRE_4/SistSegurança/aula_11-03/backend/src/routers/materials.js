import { Router } from "express";
import { addMaterial, listMaterials, editMaterial, deleteMaterial } from "../controllers/materials.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();

// todas as rotas abaixo exigem um token valido.
router.use(authenticate);
// Admin e usuario podem consultar.
router.get("/", listMaterials);
// So admins podem adicionar, editar ou excluir materiais.

router.post("/", requireRole("admin"), addMaterial);
router.put("/:id", requireRole("admin"), editMaterial);
router.delete("/:id", requireRole("admin"), deleteMaterial);


export default router;
