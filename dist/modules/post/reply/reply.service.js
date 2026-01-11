"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyService = void 0;
const reply_repository_1 = require("./reply.repository");
const AppError_1 = require("../../../types/AppError");
const http_status_codes_1 = require("http-status-codes");
const comment_repository_1 = require("../comment/comment.repository");
exports.replyService = {
    addReply: async (userId, commentId, text) => {
        const comment = await comment_repository_1.commentRepository.selectById(commentId);
        if (!comment) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "Comment not found"
            });
        }
        const replyId = await reply_repository_1.replyRepository.insert({
            userId,
            commentId,
            text
        });
        return await reply_repository_1.replyRepository.selectById(replyId);
    },
    getCommentReplies: async (commentId) => {
        return await reply_repository_1.replyRepository.selectByCommentId(commentId);
    },
    deleteReply: async (userId, replyId) => {
        const reply = await reply_repository_1.replyRepository.selectById(replyId);
        if (!reply) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "Reply not found"
            });
        }
        if (reply.userId !== userId) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.FORBIDDEN,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.FORBIDDEN),
                description: "You are not authorized to delete this reply"
            });
        }
        return await reply_repository_1.replyRepository.deleteById(replyId);
    }
};
//# sourceMappingURL=reply.service.js.map