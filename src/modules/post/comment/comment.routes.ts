import { Router } from "express";
import { CommentController } from "./comment.controller";
import { authenticateUser } from "../../../middlewares/authenticateUser.middleware";
import { validateRequest } from "../../../utils/validateRequest";
import { createCommentDtoSchema } from "../../../db/schemas/comment.schema";

const router = Router();

router.post("/:postId", authenticateUser, validateRequest(createCommentDtoSchema), CommentController.add);
router.get("/:postId", CommentController.getByPost);
router.delete("/:id", authenticateUser, CommentController.delete);

export default router;
