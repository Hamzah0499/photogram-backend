import { NextFunction, Request, Response } from "express";
import { reactionService } from "./reaction.service";
import { StatusCodes } from "http-status-codes";

export const ReactionController = {
    toggle: async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).user.id;
        const postId = Number(req.params.postId);
        const result = await reactionService.toggleLike(userId, postId);
        return res.status(StatusCodes.OK).json(result);
    },

    getLikes: async (req: Request, res: Response, next: NextFunction) => {
        const postId = Number(req.params.postId);
        const result = await reactionService.getPostLikes(postId);
        return res.status(StatusCodes.OK).json(result);
    }
};
