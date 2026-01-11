"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookmark_controller_1 = require("./bookmark.controller");
const authenticateUser_middleware_1 = require("../../../middlewares/authenticateUser.middleware");
const router = (0, express_1.Router)();
// All bookmark routes require authentication
router.use(authenticateUser_middleware_1.authenticateUser);
router.post("/toggle/:postId", bookmark_controller_1.BookmarkController.toggle);
router.get("/my-bookmarks", bookmark_controller_1.BookmarkController.getMyBookmarks);
router.get("/count/:postId", bookmark_controller_1.BookmarkController.getCount);
exports.default = router;
//# sourceMappingURL=bookmark.routes.js.map