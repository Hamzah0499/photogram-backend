import { replyRepository } from "./reply.repository";
import { AppError } from "../../../types/AppError";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { commentRepository } from "../comment/comment.repository";

export const replyService = {
    addReply: async (userId: number, commentId: number, text: string) => {
        const comment = await commentRepository.selectById(commentId);
        if (!comment) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "Comment not found"
            });
        }

        const replyId = await replyRepository.insert({
            userId,
            commentId,
            text
        });

        return await replyRepository.selectById(replyId as number);
    },

    getCommentReplies: async (commentId: number) => {
        return await replyRepository.selectByCommentId(commentId);
    },

    deleteReply: async (userId: number, replyId: number) => {
        const reply = await replyRepository.selectById(replyId);
        if (!reply) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "Reply not found"
            });
        }

        if (reply.userId !== userId) {
            throw new AppError({
                httpCode: StatusCodes.FORBIDDEN,
                name: getReasonPhrase(StatusCodes.FORBIDDEN),
                description: "You are not authorized to delete this reply"
            });
        }

        return await replyRepository.deleteById(replyId);
    }
};
