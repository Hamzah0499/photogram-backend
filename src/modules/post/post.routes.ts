import { Router } from "express";
import { PostController } from "./post.controller";
import { authenticateUser } from "../../middlewares/authenticateUser.middleware";
import uploadFile from "../../middlewares/uploadFile";
import commentRoutes from "./comment/comment.routes";
import replyRoutes from "./reply/reply.routes";
import reactionRoutes from "./reaction/reaction.routes";
import bookmarkRoutes from "./bookmark/bookmark.routes";

const router = Router();

router.post("/", authenticateUser, uploadFile.array("media", 10), PostController.create);
router.get("/", PostController.getAll);
router.get("/explore", PostController.explore);
router.get("/search", PostController.search);
router.get("/user/:username", PostController.getByUsername);
router.get("/:id", PostController.getById);
router.delete("/:id", authenticateUser, PostController.delete);

// Comments
router.use("/comments", commentRoutes);
router.use("/replies", replyRoutes);
router.use("/reactions", reactionRoutes);
router.use("/bookmarks", bookmarkRoutes);

export default router;
