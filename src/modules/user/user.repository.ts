import { db } from "../../db";
import { createUserDtoType, selectUserDtoType, userSchema } from "../../db/schemas/user.schema";
import { eq, or, sql } from "drizzle-orm";
import { followerRepository } from "./follower/follower.repository";
import { followerSchema } from "../../db/schemas/follower.schema";
import { followingSchema } from "../../db/schemas/following.schema";

export const userRepository = {
    INSERT: async (user: createUserDtoType) => {
        return (await db.insert(userSchema).values(user))[0].insertId;
    },
    SELECT_BY_EMAIL: async (email: string) => {
        return (await db.select().from(userSchema).where(eq(userSchema.email, email)))[0];
    },
    SELECT_BY_USERNAME: async (username: string) => {
        const result = await db.select({
            user: userSchema,
            followersCount: sql<number>`(SELECT COUNT(*) FROM followers WHERE follower_id = ${userSchema.id})`,
            followingCount: sql<number>`(SELECT COUNT(*) FROM following WHERE user_id = ${userSchema.id})`,
        }).from(userSchema)
            .where(eq(userSchema.username, username));

        if (result.length === 0) return null;

        return {
            ...result[0].user,
            followersCount: Number(result[0].followersCount),
            followingCount: Number(result[0].followingCount),
        };
    },
    SELECT_BY_ID: async (id: number) => {
        return (await db.select().from(userSchema).where(eq(userSchema.id, id)))[0];
    },

    UPDATE_BY_ID: async (id: number, values: any) => {
        return await db.update(userSchema).set(values)
            .where(eq(userSchema.id, id));
    },

    SOFT_DELETE_BY_ID: async (userId: number) => {
        return await db.update(userSchema).set({
            isActive: false,
            deletedAt: new Date(),
        })
            .where(eq(userSchema.id, userId));
    },

    PERMANENT_DELETE_BY_ID: async (userId: number) => {
        return await db.delete(userSchema)
            .where(eq(userSchema.id, userId));
    },

    RESTORE_BY_ID: async (userId: number) => {
        return await db.update(userSchema).set({
            isActive: true,
            deletedAt: null,
        })
            .where(eq(userSchema.id, userId));
    },

    SEARCH: async (query: string) => {
        return await db.select().from(userSchema).where(
            or(
                sql`${userSchema.username} LIKE ${`%${query}%`}`,
                sql`${userSchema.name} LIKE ${`%${query}%`}`
            )
        );
    },
}
