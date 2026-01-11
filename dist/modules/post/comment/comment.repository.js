"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepository = void 0;
const db_1 = require("../../../db");
const comment_schema_1 = require("../../../db/schemas/comment.schema");
const drizzle_orm_1 = require("drizzle-orm");
const user_schema_1 = require("../../../db/schemas/user.schema");
const reply_schema_1 = require("../../../db/schemas/reply.schema");
exports.commentRepository = {
    insert: async (comment) => {
        return (await db_1.db.insert(comment_schema_1.commentSchema).values(comment))[0].insertId;
    },
    // selectByPostId: async (postId: number) => {
    //     return await db.select().from(commentSchema).where(eq(commentSchema.postId, postId));
    // },
    selectByPostId: async (postId) => {
        const result = await db_1.db.select({
            comment: comment_schema_1.commentSchema,
            user: user_schema_1.userSchema,
        }).from(comment_schema_1.commentSchema)
            .leftJoin(user_schema_1.userSchema, (0, drizzle_orm_1.eq)(comment_schema_1.commentSchema.userId, user_schema_1.userSchema.id))
            .where((0, drizzle_orm_1.eq)(comment_schema_1.commentSchema.postId, postId));
        if (result.length === 0)
            return [];
        const commentIds = result.map(r => r.comment.id).filter((id) => id !== null);
        const allReplies = commentIds.length > 0
            ? await db_1.db.select({
                ...reply_schema_1.replySchema,
                // ...userSchema,
                username: user_schema_1.userSchema.username,
                avatar: user_schema_1.userSchema.avatar,
                email: user_schema_1.userSchema.email,
            }).from(reply_schema_1.replySchema)
                .leftJoin(user_schema_1.userSchema, (0, drizzle_orm_1.eq)(reply_schema_1.replySchema.userId, user_schema_1.userSchema.id))
                .where((0, drizzle_orm_1.inArray)(reply_schema_1.replySchema.commentId, commentIds))
            : [];
        const repliesMap = allReplies.reduce((acc, reply) => {
            const cid = reply?.commentId;
            if (cid) {
                if (!acc[cid])
                    acc[cid] = [];
                acc[cid].push(reply);
            }
            return acc;
        }, {});
        return result.map((row) => ({
            ...row.comment,
            user: row.user,
            replies: repliesMap[row.comment.id] || []
        }));
    },
    deleteById: async (id) => {
        return await db_1.db.delete(comment_schema_1.commentSchema).where((0, drizzle_orm_1.eq)(comment_schema_1.commentSchema.id, id));
    },
    selectById: async (id) => {
        return (await db_1.db.select().from(comment_schema_1.commentSchema).where((0, drizzle_orm_1.eq)(comment_schema_1.commentSchema.id, id)))[0];
    }
};
//# sourceMappingURL=comment.repository.js.map