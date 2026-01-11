"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const authenticateUser_middleware_1 = require("../../middlewares/authenticateUser.middleware");
const uploadFile_1 = __importDefault(require("../../middlewares/uploadFile"));
const comment_routes_1 = __importDefault(require("./comment/comment.routes"));
const reply_routes_1 = __importDefault(require("./reply/reply.routes"));
const reaction_routes_1 = __importDefault(require("./reaction/reaction.routes"));
const bookmark_routes_1 = __importDefault(require("./bookmark/bookmark.routes"));
const router = (0, express_1.Router)();
router.post("/", authenticateUser_middleware_1.authenticateUser, uploadFile_1.default.array("media", 10), post_controller_1.PostController.create);
router.get("/", post_controller_1.PostController.getAll);
router.get("/explore", post_controller_1.PostController.explore);
router.get("/search", post_controller_1.PostController.search);
router.get("/user/:username", post_controller_1.PostController.getByUsername);
router.get("/:id", post_controller_1.PostController.getById);
router.delete("/:id", authenticateUser_middleware_1.authenticateUser, post_controller_1.PostController.delete);
// Comments
router.use("/comments", comment_routes_1.default);
router.use("/replies", reply_routes_1.default);
router.use("/reactions", reaction_routes_1.default);
router.use("/bookmarks", bookmark_routes_1.default);
exports.default = router;
//# sourceMappingURL=post.routes.js.map