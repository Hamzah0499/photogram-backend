"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionController = void 0;
const reaction_service_1 = require("./reaction.service");
const http_status_codes_1 = require("http-status-codes");
exports.ReactionController = {
    toggle: async (req, res, next) => {
        const userId = req.user.id;
        const postId = Number(req.params.postId);
        const result = await reaction_service_1.reactionService.toggleLike(userId, postId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    getLikes: async (req, res, next) => {
        const postId = Number(req.params.postId);
        const result = await reaction_service_1.reactionService.getPostLikes(postId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    }
};
//# sourceMappingURL=reaction.controller.js.map