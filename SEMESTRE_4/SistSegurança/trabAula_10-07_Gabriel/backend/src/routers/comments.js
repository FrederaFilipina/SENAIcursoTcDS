import { Router } from "express";
import {
  listComments,
  createComment
} from "../controllers/comments.js";

import { authenticate } from "../middleware/auth.js";

const router = Router();


router.use(authenticate);


router.get("/:materialId", listComments);


router.post("/:materialId", createComment);

export default router;