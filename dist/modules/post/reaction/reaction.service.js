"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionService = void 0;
const reaction_repository_1 = require("./reaction.repository");
const AppError_1 = require("../../../types/AppError");
const http_status_codes_1 = require("http-status-codes");
const post_repository_1 = require("../post.repository");
exports.reactionService = {
    toggleLike: async (userId, postId) => {
        const post = await post_repository_1.postRepository.selectById(postId);
        if (!post) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "Post not found"
            });
        }
        const alreadyLiked = await reaction_repository_1.reactionRepository.isReacted(userId, postId);
        if (alreadyLiked) {
            await reaction_repository_1.reactionRepository.delete(userId, postId);
            return { message: "Post unliked" };
        }
        else {
            await reaction_repository_1.reactionRepository.insert({ userId, postId });
            return { message: "Post liked" };
        }
    },
    getPostLikes: async (postId) => {
        return await reaction_repository_1.reactionRepository.selectByPostId(postId);
    }
};
//# sourceMappingURL=reaction.service.js.map