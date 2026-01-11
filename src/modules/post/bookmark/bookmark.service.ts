import { bookmarkRepository } from "./bookmark.repository";
import { postRepository } from "../post.repository";
import { AppError } from "../../../types/AppError";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export const bookmarkService = {
    toggleBookmark: async (userId: number, postId: number) => {
        // 1. Check if post exists
        const post = await postRepository.selectById(postId);
        if (!post) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "Post not found"
            });
        }

        // 2. Check if already bookmarked
        const existingBookmark = await bookmarkRepository.selectOne(userId, postId);

        if (existingBookmark) {
            // Remove bookmark
            await bookmarkRepository.delete(userId, postId);
            return { message: "Post Unbookmarked", bookmarked: false };
        } else {
            // Add bookmark
            await bookmarkRepository.insert({ userId, postId });
            return { message: "Post Bookmarked", bookmarked: true };
        }
    },

    getMyBookmarks: async (userId: number) => {
        return await bookmarkRepository.selectUserBookmarks(userId);
    },

    getBookmarkCount: async (postId: number) => {
        return await bookmarkRepository.countByPostId(postId);
    }
};
