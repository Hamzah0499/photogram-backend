import { db } from "../../../db";
import { followingSchema } from "../../../db/schemas/following.schema";
import { and, eq } from "drizzle-orm";

export const followingRepository = {
    insert: async (userId: number, followingId: number) => {
        return await db.insert(followingSchema).values({
            userId, // who is following
            followingId, // who is followed
        });
    },

    delete: async (userId: number, followingId: number) => {
        return await db.delete(followingSchema).where(
            and(
                eq(followingSchema.userId, userId),
                eq(followingSchema.followingId, followingId)
            )
        );
    },

    getFollowing: async (userId: number) => {
        return await db.select().from(followingSchema).where(eq(followingSchema.userId, userId));
    },

    getFollowers: async (userId: number) => {
        return await db.select().from(followingSchema).where(eq(followingSchema.followingId, userId));
    },

    isFollowing: async (userId: number, followedId: number) => {
        const result = await db.select().from(followingSchema).where(
            and(
                eq(followingSchema.userId, userId),
                eq(followingSchema.followingId, followedId)
            )
        );
        return result.length > 0;
    }
};
