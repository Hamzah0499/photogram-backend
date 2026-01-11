import { NextFunction, Request, Response } from "express";
import { replyService } from "./reply.service";
import { StatusCodes } from "http-status-codes";

export const ReplyController = {
    add: async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).user.id;
        const commentId = Number(req.params.commentId);
        const { text } = req.body;
        const result = await replyService.addReply(userId, commentId, text);
        return res.status(StatusCodes.CREATED).json(result);
    },

    getByComment: async (req: Request, res: Response, next: NextFunction) => {
        const commentId = Number(req.params.commentId);
        const result = await replyService.getCommentReplies(commentId);
        return res.status(StatusCodes.OK).json(result);
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).user.id;
        const replyId = Number(req.params.id);
        await replyService.deleteReply(userId, replyId);
        return res.status(StatusCodes.OK).json({ message: "Reply deleted" });
    }
};
