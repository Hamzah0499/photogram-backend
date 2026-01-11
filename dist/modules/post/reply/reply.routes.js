"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reply_controller_1 = require("./reply.controller");
const authenticateUser_middleware_1 = require("../../../middlewares/authenticateUser.middleware");
const validateRequest_1 = require("../../../utils/validateRequest");
const reply_schema_1 = require("../../../db/schemas/reply.schema");
const router = (0, express_1.Router)();
router.post("/:commentId", authenticateUser_middleware_1.authenticateUser, (0, validateRequest_1.validateRequest)(reply_schema_1.createReplyDtoSchema), reply_controller_1.ReplyController.add);
router.get("/:commentId", reply_controller_1.ReplyController.getByComment);
router.delete("/:id", authenticateUser_middleware_1.authenticateUser, reply_controller_1.ReplyController.delete);
exports.default = router;
//# sourceMappingURL=reply.routes.js.map