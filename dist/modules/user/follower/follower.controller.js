"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerController = void 0;
const follower_service_1 = require("./follower.service");
const http_status_codes_1 = require("http-status-codes");
exports.FollowerController = {
    follow: async (req, res, next) => {
        const userId = req.user.id;
        const followId = Number(req.params.id);
        const result = await follower_service_1.followerService.followUser(userId, followId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    unfollow: async (req, res, next) => {
        const userId = req.user.id;
        const unfollowId = Number(req.params.id);
        const result = await follower_service_1.followerService.unfollowUser(userId, unfollowId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    getFollowers: async (req, res, next) => {
        const userId = Number(req.params.id);
        const result = await follower_service_1.followerService.getFollowers(userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    getFollowing: async (req, res, next) => {
        const userId = Number(req.params.id);
        const result = await follower_service_1.followerService.getFollowing(userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    }
};
//# sourceMappingURL=follower.controller.js.map