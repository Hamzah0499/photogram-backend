"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reaction_controller_1 = require("./reaction.controller");
const authenticateUser_middleware_1 = require("../../../middlewares/authenticateUser.middleware");
const router = (0, express_1.Router)();
router.post("/:postId", authenticateUser_middleware_1.authenticateUser, reaction_controller_1.ReactionController.toggle);
router.get("/:postId", reaction_controller_1.ReactionController.getLikes);
exports.default = router;
//# sourceMappingURL=reaction.routes.js.map