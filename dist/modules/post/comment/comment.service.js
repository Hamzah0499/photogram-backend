"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const comment_repository_1 = require("./comment.repository");
const AppError_1 = require("../../../types/AppError");
const http_status_codes_1 = require("http-status-codes");
const post_repository_1 = require("../post.repository");
const sentiment_1 = __importDefault(require("sentiment"));
const sentiment = new sentiment_1.default();
exports.commentService = {
    addComment: async (userId, postId, text) => {
        const post = await post_repository_1.postRepository.selectById(postId);
        if (!post) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "Post not found"
            });
        }
        // Advanced Feature: Sentiment Analysis
        const analysis = sentiment.analyze(text);
        let sentimentLabel = "neutral";
        if (analysis.score > 0)
            sentimentLabel = "positive";
        else if (analysis.score < 0)
            sentimentLabel = "negative";
        console.log("comment to post: ", userId, " - ", postId, " - ", text);
        console.log("Comment Sentiment: ", sentimentLabel);
        const commentId = await comment_repository_1.commentRepository.insert({
            userId,
            postId,
            text,
            sentiment: sentimentLabel
        });
        return { message: "Comment added successfully" };
        // return await commentRepository.selectById(commentId as number);
    },
    getPostComments: async (postId) => {
        return await comment_repository_1.commentRepository.selectByPostId(postId);
    },
    deleteComment: async (userId, commentId) => {
        const comment = await comment_repository_1.commentRepository.selectById(commentId);
        if (!comment) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "Comment not found"
            });
        }
        if (comment.userId !== userId) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.FORBIDDEN,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.FORBIDDEN),
                description: "You are not authorized to delete this comment"
            });
        }
        return await comment_repository_1.commentRepository.deleteById(commentId);
    }
};
//# sourceMappingURL=comment.service.js.map