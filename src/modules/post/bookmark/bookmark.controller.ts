import { Request, Response, NextFunction } from "express";
import { bookmarkService } from "./bookmark.service";
import { StatusCodes } from "http-status-codes";

export const BookmarkController = {
    toggle: async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).user.id;
        const postId = Number(req.params.postId);
        const result = await bookmarkService.toggleBookmark(userId, postId);
        return res.status(StatusCodes.OK).json(result);
    },

    getMyBookmarks: async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).user.id;
        const result = await bookmarkService.getMyBookmarks(userId);
        return res.status(StatusCodes.OK).json(result);
    },

    getCount: async (req: Request, res: Response, next: NextFunction) => {
        const postId = Number(req.params.postId);
        const count = await bookmarkService.getBookmarkCount(postId);
        return res.status(StatusCodes.OK).json({ count });
    }
};
