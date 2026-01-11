"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkService = void 0;
const bookmark_repository_1 = require("./bookmark.repository");
const post_repository_1 = require("../post.repository");
const AppError_1 = require("../../../types/AppError");
const http_status_codes_1 = require("http-status-codes");
exports.bookmarkService = {
    toggleBookmark: async (userId, postId) => {
        // 1. Check if post exists
        const post = await post_repository_1.postRepository.selectById(postId);
        if (!post) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "Post not found"
            });
        }
        // 2. Check if already bookmarked
        const existingBookmark = await bookmark_repository_1.bookmarkRepository.selectOne(userId, postId);
        if (existingBookmark) {
            // Remove bookmark
            await bookmark_repository_1.bookmarkRepository.delete(userId, postId);
            return { message: "Post Unbookmarked", bookmarked: false };
        }
        else {
            // Add bookmark
            await bookmark_repository_1.bookmarkRepository.insert({ userId, postId });
            return { message: "Post Bookmarked", bookmarked: true };
        }
    },
    getMyBookmarks: async (userId) => {
        return await bookmark_repository_1.bookmarkRepository.selectUserBookmarks(userId);
    },
    getBookmarkCount: async (postId) => {
        return await bookmark_repository_1.bookmarkRepository.countByPostId(postId);
    }
};
//# sourceMappingURL=bookmark.service.js.map