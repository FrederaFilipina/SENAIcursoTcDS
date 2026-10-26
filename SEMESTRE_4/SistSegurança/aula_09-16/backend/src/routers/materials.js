import { Router } from "express";
import { listMaterials, deleteMaterial } from "../controllers/materials.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();

// Todas as rotas exigem autenticação.
router.use(authenticate);

// Admin e user podem pesquisar.
// O controller limita os resultados conforme o perfil.
router.get("/", listMaterials);

// Somente admin pode excluir materiais.
router.delete("/:id", requireRole("admin"), deleteMaterial);

export default router;