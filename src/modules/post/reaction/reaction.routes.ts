import { Router } from "express";
import { ReactionController } from "./reaction.controller";
import { authenticateUser } from "../../../middlewares/authenticateUser.middleware";

const router = Router();

router.post("/:postId", authenticateUser, ReactionController.toggle);
router.get("/:postId", ReactionController.getLikes);

export default router;
