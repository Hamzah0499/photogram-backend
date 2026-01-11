"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const post_repository_1 = require("./post.repository");
const media_repository_1 = require("../media/media.repository");
const cloudStorage_1 = require("../../utils/cloudStorage");
const AppError_1 = require("../../types/AppError");
const http_status_codes_1 = require("http-status-codes");
const user_repository_1 = require("../user/user.repository");
exports.postService = {
    createPost: async (creatorId, data, files) => {
        const user = await user_repository_1.userRepository.SELECT_BY_ID(creatorId);
        if (!user || user.role !== "creator") {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.FORBIDDEN,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.FORBIDDEN),
                description: "Only creators can create posts"
            });
        }
        if (!files || files.length === 0) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_REQUEST),
                description: "At least one media file is required"
            });
        }
        // Create post
        const postId = await post_repository_1.postRepository.insert({
            creatorId,
            caption: data.caption,
            location: data.location,
            people: data.people,
        });
        // Upload and save media
        const uploadedMedia = [];
        for (const file of files) {
            // const cloudFile = await cloudStorage.uploadMedia(file, "posts");
            // Advanced Feature: Resizing & Watermarking
            const cloudFile = await cloudStorage_1.cloudStorage.uploadMedia(file, "posts", user.username || "Photogram");
            const mediaId = await media_repository_1.mediaRepository.insert({
                postId: postId,
                title: file.originalname,
                type: file.mimetype.startsWith("video") ? "video" : "image",
                blobUrl: cloudFile.blobUrl,
            });
            uploadedMedia.push({
                id: mediaId,
                blobUrl: cloudFile.blobUrl,
            });
        }
        const post = await post_repository_1.postRepository.selectById(postId);
        return { ...post, media: uploadedMedia };
    },
    getAllPosts: async () => {
        return await post_repository_1.postRepository.selectAllPostWithCreator();
        // const postsWithMedia = [];
        // for (const post of posts) {
        //     const media = await mediaRepository.selectByPostId(post.id);
        //     postsWithMedia.push({ ...post, media });
        // }
        // return postsWithMedia;
    },
    getPostById: async (postId) => {
        const post = await post_repository_1.postRepository.selectById(postId);
        if (!post) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "Post not found"
            });
        }
        const media = await media_repository_1.mediaRepository.selectByPostId(postId);
        return { ...post, media };
    },
    deletePost: async (userId, postId) => {
        const post = await post_repository_1.postRepository.selectById(postId);
        if (!post) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "Post not found"
            });
        }
        if (post.creatorId !== userId) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.FORBIDDEN,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.FORBIDDEN),
                description: "You are not authorized to delete this post"
            });
        }
        // Delete media from cloud/local storage
        const media = await media_repository_1.mediaRepository.selectByPostId(postId);
        for (const m of media) {
            if (m.blobUrl) {
                await cloudStorage_1.cloudStorage.deleteMedia(m.blobUrl);
            }
        }
        return await post_repository_1.postRepository.deleteById(postId);
    },
    getPostsByUsername: async (username) => {
        return await post_repository_1.postRepository.selectByUsername(username);
    },
    searchPosts: async (query) => {
        return await post_repository_1.postRepository.search(query);
    },
    getExplorePosts: async () => {
        return await post_repository_1.postRepository.selectExplore();
    }
};
//# sourceMappingURL=post.service.js.map