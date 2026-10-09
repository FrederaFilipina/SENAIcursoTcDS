import { Router } from "express";
import { listComments, createComment, deleteComment } from "../controllers/comments.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();


router.use(authenticate);


router.get("/:materialId", listComments);


router.post("/:materialId", createComment);

router.delete("/:id", requireRole("admin"), deleteComment);

export default router;
