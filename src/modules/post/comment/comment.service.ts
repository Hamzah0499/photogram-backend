import { commentRepository } from "./comment.repository";
import { AppError } from "../../../types/AppError";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { postRepository } from "../post.repository";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

export const commentService = {
    addComment: async (userId: number, postId: number, text: string) => {
        const post = await postRepository.selectById(postId);
        if (!post) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "Post not found"
            });
        }

        // Advanced Feature: Sentiment Analysis
        const analysis = sentiment.analyze(text);
        let sentimentLabel = "neutral";
        if (analysis.score > 0) sentimentLabel = "positive";
        else if (analysis.score < 0) sentimentLabel = "negative";


        console.log("comment to post: ", userId, " - ", postId, " - ", text)
        console.log("Comment Sentiment: ", sentimentLabel)

        const commentId = await commentRepository.insert({
            userId,
            postId,
            text,
            sentiment: sentimentLabel
        });
        return { message: "Comment added successfully" };
        // return await commentRepository.selectById(commentId as number);
    },

    getPostComments: async (postId: number) => {
        return await commentRepository.selectByPostId(postId);
    },

    deleteComment: async (userId: number, commentId: number) => {
        const comment = await commentRepository.selectById(commentId);
        if (!comment) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "Comment not found"
            });
        }

        if (comment.userId !== userId) {
            throw new AppError({
                httpCode: StatusCodes.FORBIDDEN,
                name: getReasonPhrase(StatusCodes.FORBIDDEN),
                description: "You are not authorized to delete this comment"
            });
        }

        return await commentRepository.deleteById(commentId);
    }
};
