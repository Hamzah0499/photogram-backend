import { postRepository } from "./post.repository";
import { mediaRepository } from "../media/media.repository";
import { cloudStorage } from "../../utils/cloudStorage";
import { AppError } from "../../types/AppError";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { userRepository } from "../user/user.repository";

export const postService = {
    createPost: async (creatorId: number, data: any, files: Express.Multer.File[]) => {
        const user = await userRepository.SELECT_BY_ID(creatorId);

        if (!user || user.role !== "creator") {
            throw new AppError({
                httpCode: StatusCodes.FORBIDDEN,
                name: getReasonPhrase(StatusCodes.FORBIDDEN),
                description: "Only creators can create posts"
            });
        }

        if (!files || files.length === 0) {
            throw new AppError({
                httpCode: StatusCodes.BAD_REQUEST,
                name: getReasonPhrase(StatusCodes.BAD_REQUEST),
                description: "At least one media file is required"
            });
        }

        // Create post
        const postId = await postRepository.insert({
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
            const cloudFile = await cloudStorage.uploadMedia(file, "posts", user.username || "Photogram");

            const mediaId = await mediaRepository.insert({
                postId: postId as number,
                title: file.originalname,
                type: file.mimetype.startsWith("video") ? "video" : "image",
                blobUrl: cloudFile.blobUrl,
            });

            uploadedMedia.push({
                id: mediaId,
                blobUrl: cloudFile.blobUrl,
            });
        }

        const post = await postRepository.selectById(postId as number);
        return { ...post, media: uploadedMedia };
    },

    getAllPosts: async () => {
        return await postRepository.selectAllPostWithCreator();
        // const postsWithMedia = [];

        // for (const post of posts) {
        //     const media = await mediaRepository.selectByPostId(post.id);
        //     postsWithMedia.push({ ...post, media });
        // }

        // return postsWithMedia;
    },

    getPostById: async (postId: number) => {
        const post = await postRepository.selectById(postId);
        if (!post) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "Post not found"
            });
        }
        const media = await mediaRepository.selectByPostId(postId);
        return { ...post, media };
    },

    deletePost: async (userId: number, postId: number) => {
        const post = await postRepository.selectById(postId);
        if (!post) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "Post not found"
            });
        }

        if (post.creatorId !== userId) {
            throw new AppError({
                httpCode: StatusCodes.FORBIDDEN,
                name: getReasonPhrase(StatusCodes.FORBIDDEN),
                description: "You are not authorized to delete this post"
            });
        }

        // Delete media from cloud/local storage
        const media = await mediaRepository.selectByPostId(postId);
        for (const m of media) {
            if (m.blobUrl) {
                await cloudStorage.deleteMedia(m.blobUrl);
            }
        }

        return await postRepository.deleteById(postId);
    },

    getPostsByUsername: async (username: string) => {
        return await postRepository.selectByUsername(username);
    },

    searchPosts: async (query: string) => {
        return await postRepository.search(query);
    },

    getExplorePosts: async () => {
        return await postRepository.selectExplore();
    }
};
