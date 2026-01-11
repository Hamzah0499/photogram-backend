import { Router } from "express";
import { BookmarkController } from "./bookmark.controller";
import { authenticateUser } from "../../../middlewares/authenticateUser.middleware";

const router = Router();

// All bookmark routes require authentication
router.use(authenticateUser);

router.post("/toggle/:postId", BookmarkController.toggle);
router.get("/my-bookmarks", BookmarkController.getMyBookmarks);
router.get("/count/:postId", BookmarkController.getCount);

export default router;
