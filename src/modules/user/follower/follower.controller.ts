import { NextFunction, Request, Response } from "express";
import { followerService } from "./follower.service";
import { StatusCodes } from "http-status-codes";

export const FollowerController = {
    follow: async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).user.id;
        const followId = Number(req.params.id);
        const result = await followerService.followUser(userId, followId);
        return res.status(StatusCodes.OK).json(result);
    },

    unfollow: async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).user.id;
        const unfollowId = Number(req.params.id);
        const result = await followerService.unfollowUser(userId, unfollowId);
        return res.status(StatusCodes.OK).json(result);
    },

    getFollowers: async (req: Request, res: Response, next: NextFunction) => {
        const userId = Number(req.params.id);
        const result = await followerService.getFollowers(userId);
        return res.status(StatusCodes.OK).json(result);
    },

    getFollowing: async (req: Request, res: Response, next: NextFunction) => {
        const userId = Number(req.params.id);
        const result = await followerService.getFollowing(userId);
        return res.status(StatusCodes.OK).json(result);
    }
};
