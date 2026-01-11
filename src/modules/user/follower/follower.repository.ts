import { db } from "../../../db";
import { followerSchema } from "../../../db/schemas/follower.schema";
import { and, eq } from "drizzle-orm";

export const followerRepository = {
    insert: async (userId: number, followerId: number) => {
        return await db.insert(followerSchema).values({
            userId, // follower
            followerId, // followed
        });
    },

    delete: async (userId: number, followerId: number) => {
        return await db.delete(followerSchema).where(
            and(
                eq(followerSchema.userId, userId),
                eq(followerSchema.followerId, followerId)
            )
        );
    },

    getFollowers: async (userId: number) => {
        // userId here is the person BEING followed (followerId in the schema according to comments)
        // Wait, the comment in schema said: userID: who is following, followerID: who is followed.
        // So to get followers of X, we need to find rows where followerId = X.
        return await db.select().from(followerSchema).where(eq(followerSchema.followerId, userId));
    },

    getFollowing: async (userId: number) => {
        // to get who X follows, we need to find rows where userId = X.
        return await db.select().from(followerSchema).where(eq(followerSchema.userId, userId));
    },

    isFollowing: async (userId: number, followedId: number) => {
        const result = await db.select().from(followerSchema).where(
            and(
                eq(followerSchema.userId, userId),
                eq(followerSchema.followerId, followedId)
            )
        );
        return result.length > 0;
    }
};
