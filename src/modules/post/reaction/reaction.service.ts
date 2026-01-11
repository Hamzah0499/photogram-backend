import { reactionRepository } from "./reaction.repository";
import { AppError } from "../../../types/AppError";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { postRepository } from "../post.repository";

export const reactionService = {
    toggleLike: async (userId: number, postId: number) => {
        const post = await postRepository.selectById(postId);
        if (!post) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "Post not found"
            });
        }

        const alreadyLiked = await reactionRepository.isReacted(userId, postId);

        if (alreadyLiked) {
            await reactionRepository.delete(userId, postId);
            return { message: "Post unliked" };
        } else {
            await reactionRepository.insert({ userId, postId });
            return { message: "Post liked" };
        }
    },

    getPostLikes: async (postId: number) => {
        return await reactionRepository.selectByPostId(postId);
    }
};
