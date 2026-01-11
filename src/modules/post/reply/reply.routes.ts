import { Router } from "express";
import { ReplyController } from "./reply.controller";
import { authenticateUser } from "../../../middlewares/authenticateUser.middleware";
import { validateRequest } from "../../../utils/validateRequest";
import { createReplyDtoSchema } from "../../../db/schemas/reply.schema";

const router = Router();

router.post("/:commentId", authenticateUser, validateRequest(createReplyDtoSchema), ReplyController.add);
router.get("/:commentId", ReplyController.getByComment);
router.delete("/:id", authenticateUser, ReplyController.delete);

export default router;
