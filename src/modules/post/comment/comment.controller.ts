import { NextFunction, Request, Response } from "express";
import { commentService } from "./comment.service";
import { StatusCodes } from "http-status-codes";

export const CommentController = {
    add: async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).user.id;
        const postId = Number(req.params.postId);
        const { text } = req.body;
        const result = await commentService.addComment(userId, postId, text);
        return res.status(StatusCodes.CREATED).json(result);
    },

    getByPost: async (req: Request, res: Response, next: NextFunction) => {
        const postId = Number(req.params.postId);
        const result = await commentService.getPostComments(postId);
        return res.status(StatusCodes.OK).json(result);
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).user.id;
        const commentId = Number(req.params.id);
        await commentService.deleteComment(userId, commentId);
        return res.status(StatusCodes.OK).json({ message: "Comment deleted" });
    }
};
