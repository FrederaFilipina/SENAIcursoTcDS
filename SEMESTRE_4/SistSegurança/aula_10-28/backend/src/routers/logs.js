import { Router } from "express";
import { listLog } from "../controllers/log.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();

router.use(authenticate)

router.get('/', requireRole("admin"), listLog)

export default router;