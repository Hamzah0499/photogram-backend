"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const follower_controller_1 = require("./follower.controller");
const authenticateUser_middleware_1 = require("../../../middlewares/authenticateUser.middleware");
const router = (0, express_1.Router)();
router.post("/follow/:id", authenticateUser_middleware_1.authenticateUser, follower_controller_1.FollowerController.follow);
router.post("/unfollow/:id", authenticateUser_middleware_1.authenticateUser, follower_controller_1.FollowerController.unfollow);
router.get("/followers/:id", follower_controller_1.FollowerController.getFollowers);
router.get("/following/:id", follower_controller_1.FollowerController.getFollowing);
exports.default = router;
//# sourceMappingURL=follower.routes.js.map