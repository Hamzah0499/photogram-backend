"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followerService = void 0;
const follower_repository_1 = require("./follower.repository");
const following_repository_1 = require("../following/following.repository");
const AppError_1 = require("../../../types/AppError");
const http_status_codes_1 = require("http-status-codes");
const user_repository_1 = require("../user.repository");
exports.followerService = {
    followUser: async (userId, followId) => {
        if (userId === followId) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_REQUEST),
                description: "You cannot follow yourself"
            });
        }
        const targetUser = await user_repository_1.userRepository.SELECT_BY_ID(followId);
        if (!targetUser) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "User to follow not found"
            });
        }
        const alreadyFollowing = await following_repository_1.followingRepository.isFollowing(userId, followId);
        if (alreadyFollowing) {
            return { message: "Already following this user" };
        }
        // Transactions would be better here, but performing both sequentially
        await follower_repository_1.followerRepository.insert(userId, followId);
        await following_repository_1.followingRepository.insert(userId, followId);
        return { message: "Followed successfully" };
    },
    unfollowUser: async (userId, unfollowId) => {
        const alreadyFollowing = await following_repository_1.followingRepository.isFollowing(userId, unfollowId);
        if (!alreadyFollowing) {
            return { message: "Not following this user" };
        }
        await follower_repository_1.followerRepository.delete(userId, unfollowId);
        await following_repository_1.followingRepository.delete(userId, unfollowId);
        return { message: "Unfollowed successfully" };
    },
    getFollowers: async (userId) => {
        // Get people who follow userId
        const followers = await follower_repository_1.followerRepository.getFollowers(userId);
        return followers;
    },
    getFollowing: async (userId) => {
        // Get people who userId is following
        const following = await following_repository_1.followingRepository.getFollowing(userId);
        return following;
    }
};
//# sourceMappingURL=follower.service.js.map