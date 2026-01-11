import { NextFunction, Request, Response } from "express";
import { postService } from "./post.service";
import { StatusCodes } from "http-status-codes";

export const PostController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).user.id;
        const result = await postService.createPost(userId, req.body, req.files as Express.Multer.File[]);
        return res.status(StatusCodes.CREATED).json(result);
    },

    getAll: async (req: Request, res: Response, next: NextFunction) => {
        const result = await postService.getAllPosts();
        return res.status(StatusCodes.OK).json(result);
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
        const result = await postService.getPostById(Number(req.params.id));
        return res.status(StatusCodes.OK).json(result);
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).user.id;
        const result = await postService.deletePost(userId, Number(req.params.id));
        return res.status(StatusCodes.OK).json({ message: "Post deleted" });
    },

    getByUsername: async (req: Request, res: Response, next: NextFunction) => {
        const posts = await postService.getPostsByUsername(req.params.username);
        return res.status(StatusCodes.OK).json(posts);
    },

    search: async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query.query as string;
        const posts = await postService.searchPosts(query);
        return res.status(StatusCodes.OK).json(posts);
    },

    explore: async (req: Request, res: Response, next: NextFunction) => {
        const posts = await postService.getExplorePosts();
        return res.status(StatusCodes.OK).json(posts);
    }
};
