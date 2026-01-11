import { Router } from "express";
import { FollowerController } from "./follower.controller";
import { authenticateUser } from "../../../middlewares/authenticateUser.middleware";

const router = Router();

router.post("/follow/:id", authenticateUser, FollowerController.follow);
router.post("/unfollow/:id", authenticateUser, FollowerController.unfollow);
router.get("/followers/:id", FollowerController.getFollowers);
router.get("/following/:id", FollowerController.getFollowing);

export default router;
