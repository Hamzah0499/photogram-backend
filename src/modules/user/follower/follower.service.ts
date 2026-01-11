import { followerRepository } from "./follower.repository";
import { followingRepository } from "../following/following.repository";
import { AppError } from "../../../types/AppError";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { userRepository } from "../user.repository";

export const followerService = {
    followUser: async (userId: number, followId: number) => {
        if (userId === followId) {
            throw new AppError({
                httpCode: StatusCodes.BAD_REQUEST,
                name: getReasonPhrase(StatusCodes.BAD_REQUEST),
                description: "You cannot follow yourself"
            });
        }

        const targetUser = await userRepository.SELECT_BY_ID(followId);
        if (!targetUser) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "User to follow not found"
            });
        }

        const alreadyFollowing = await followingRepository.isFollowing(userId, followId);
        if (alreadyFollowing) {
            return { message: "Already following this user" };
        }

        // Transactions would be better here, but performing both sequentially
        await followerRepository.insert(userId, followId);
        await followingRepository.insert(userId, followId);

        return { message: "Followed successfully" };
    },

    unfollowUser: async (userId: number, unfollowId: number) => {
        const alreadyFollowing = await followingRepository.isFollowing(userId, unfollowId);
        if (!alreadyFollowing) {
            return { message: "Not following this user" };
        }

        await followerRepository.delete(userId, unfollowId);
        await followingRepository.delete(userId, unfollowId);

        return { message: "Unfollowed successfully" };
    },

    getFollowers: async (userId: number) => {
        // Get people who follow userId
        const followers = await followerRepository.getFollowers(userId);
        return followers;
    },

    getFollowing: async (userId: number) => {
        // Get people who userId is following
        const following = await followingRepository.getFollowing(userId);
        return following;
    }
};
