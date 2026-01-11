"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("./comment.controller");
const authenticateUser_middleware_1 = require("../../../middlewares/authenticateUser.middleware");
const validateRequest_1 = require("../../../utils/validateRequest");
const comment_schema_1 = require("../../../db/schemas/comment.schema");
const router = (0, express_1.Router)();
router.post("/:postId", authenticateUser_middleware_1.authenticateUser, (0, validateRequest_1.validateRequest)(comment_schema_1.createCommentDtoSchema), comment_controller_1.CommentController.add);
router.get("/:postId", comment_controller_1.CommentController.getByPost);
router.delete("/:id", authenticateUser_middleware_1.authenticateUser, comment_controller_1.CommentController.delete);
exports.default = router;
//# sourceMappingURL=comment.routes.js.map