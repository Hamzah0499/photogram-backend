"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comment_service_1 = require("./comment.service");
const http_status_codes_1 = require("http-status-codes");
exports.CommentController = {
    add: async (req, res, next) => {
        const userId = req.user.id;
        const postId = Number(req.params.postId);
        const { text } = req.body;
        const result = await comment_service_1.commentService.addComment(userId, postId, text);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
    },
    getByPost: async (req, res, next) => {
        const postId = Number(req.params.postId);
        const result = await comment_service_1.commentService.getPostComments(postId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    delete: async (req, res, next) => {
        const userId = req.user.id;
        const commentId = Number(req.params.id);
        await comment_service_1.commentService.deleteComment(userId, commentId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Comment deleted" });
    }
};
//# sourceMappingURL=comment.controller.js.map