"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyController = void 0;
const reply_service_1 = require("./reply.service");
const http_status_codes_1 = require("http-status-codes");
exports.ReplyController = {
    add: async (req, res, next) => {
        const userId = req.user.id;
        const commentId = Number(req.params.commentId);
        const { text } = req.body;
        const result = await reply_service_1.replyService.addReply(userId, commentId, text);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
    },
    getByComment: async (req, res, next) => {
        const commentId = Number(req.params.commentId);
        const result = await reply_service_1.replyService.getCommentReplies(commentId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    delete: async (req, res, next) => {
        const userId = req.user.id;
        const replyId = Number(req.params.id);
        await reply_service_1.replyService.deleteReply(userId, replyId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Reply deleted" });
    }
};
//# sourceMappingURL=reply.controller.js.map