import { db } from "../../../db";
import { replySchema } from "../../../db/schemas/reply.schema";
import { eq } from "drizzle-orm";
import { createReplyDtoType } from "../../../db/schemas/reply.schema";

export const replyRepository = {
    insert: async (reply: createReplyDtoType) => {
        return (await db.insert(replySchema).values(reply))[0].insertId;
    },

    selectByCommentId: async (commentId: number) => {
        return await db.select().from(replySchema).where(eq(replySchema.commentId, commentId));
    },

    deleteById: async (id: number) => {
        return await db.delete(replySchema).where(eq(replySchema.id, id));
    },

    selectById: async (id: number) => {
        return (await db.select().from(replySchema).where(eq(replySchema.id, id)))[0];
    }
};
