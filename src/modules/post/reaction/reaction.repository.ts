import { db } from "../../../db";
import { reactionSchema } from "../../../db/schemas/reaction.schema";
import { and, eq } from "drizzle-orm";
import { createReactionDtoType } from "../../../db/schemas/reaction.schema";

export const reactionRepository = {
    insert: async (reaction: createReactionDtoType) => {
        return (await db.insert(reactionSchema).values(reaction))[0].insertId;
    },

    delete: async (userId: number, postId: number) => {
        return await db.delete(reactionSchema).where(
            and(
                eq(reactionSchema.userId, userId),
                eq(reactionSchema.postId, postId)
            )
        );
    },

    selectByPostId: async (postId: number) => {
        return await db.select().from(reactionSchema).where(eq(reactionSchema.postId, postId));
    },

    isReacted: async (userId: number, postId: number) => {
        const result = await db.select().from(reactionSchema).where(
            and(
                eq(reactionSchema.userId, userId),
                eq(reactionSchema.postId, postId)
            )
        );
        return result.length > 0;
    }
};
