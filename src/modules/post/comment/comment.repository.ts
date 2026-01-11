import { db } from "../../../db";
import { commentSchema } from "../../../db/schemas/comment.schema";
import { eq, inArray } from "drizzle-orm";
import { createCommentDtoType } from "../../../db/schemas/comment.schema";
import { userSchema } from "../../../db/schemas/user.schema";
import { replySchema } from "../../../db/schemas/reply.schema";

export const commentRepository = {
    insert: async (comment: createCommentDtoType) => {
        return (await db.insert(commentSchema).values(comment))[0].insertId;
    },

    // selectByPostId: async (postId: number) => {
    //     return await db.select().from(commentSchema).where(eq(commentSchema.postId, postId));
    // },
    selectByPostId: async (postId: number) => {
        const result = await db.select({
            comment: commentSchema,
            user: userSchema,
        }).from(commentSchema)
            .leftJoin(userSchema, eq(commentSchema.userId, userSchema.id))
            .where(eq(commentSchema.postId, postId));

        if (result.length === 0) return [];

        const commentIds = result.map(r => r.comment.id).filter((id): id is number => id !== null);

        const allReplies: any = commentIds.length > 0
            ? await db.select({
                ...replySchema,
                // ...userSchema,
                username: userSchema.username,
                avatar: userSchema.avatar,
                email: userSchema.email,

            } as any).from(replySchema)
                .leftJoin(userSchema, eq(replySchema.userId, userSchema.id))
                .where(inArray(replySchema.commentId, commentIds))
            : [];

        const repliesMap: any = allReplies.reduce((acc: any, reply: any) => {
            const cid = reply?.commentId;
            if (cid) {
                if (!acc[cid]) acc[cid] = [];
                acc[cid].push(reply);
            }
            return acc;
        }, {} as Record<number, any[]>);

        return result.map((row) => ({
            ...row.comment,
            user: row.user,
            replies: repliesMap[row.comment.id] || []
        }));
    },

    deleteById: async (id: number) => {
        return await db.delete(commentSchema).where(eq(commentSchema.id, id));
    },

    selectById: async (id: number) => {
        return (await db.select().from(commentSchema).where(eq(commentSchema.id, id)))[0];
    }
};
