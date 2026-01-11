"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const post_service_1 = require("./post.service");
const http_status_codes_1 = require("http-status-codes");
exports.PostController = {
    create: async (req, res, next) => {
        const userId = req.user.id;
        const result = await post_service_1.postService.createPost(userId, req.body, req.files);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
    },
    getAll: async (req, res, next) => {
        const result = await post_service_1.postService.getAllPosts();
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    getById: async (req, res, next) => {
        const result = await post_service_1.postService.getPostById(Number(req.params.id));
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    delete: async (req, res, next) => {
        const userId = req.user.id;
        const result = await post_service_1.postService.deletePost(userId, Number(req.params.id));
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Post deleted" });
    },
    getByUsername: async (req, res, next) => {
        const posts = await post_service_1.postService.getPostsByUsername(req.params.username);
        return res.status(http_status_codes_1.StatusCodes.OK).json(posts);
    },
    search: async (req, res, next) => {
        const query = req.query.query;
        const posts = await post_service_1.postService.searchPosts(query);
        return res.status(http_status_codes_1.StatusCodes.OK).json(posts);
    },
    explore: async (req, res, next) => {
        const posts = await post_service_1.postService.getExplorePosts();
        return res.status(http_status_codes_1.StatusCodes.OK).json(posts);
    }
};
//# sourceMappingURL=post.controller.js.map