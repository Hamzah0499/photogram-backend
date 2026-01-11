"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkRepository = void 0;
const db_1 = require("../../../db");
const bookmark_schema_1 = require("../../../db/schemas/bookmark.schema");
const post_schema_1 = require("../../../db/schemas/post.schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.bookmarkRepository = {
    insert: async (data) => {
        return (await db_1.db.insert(bookmark_schema_1.bookmarkSchema).values(data))[0].insertId;
    },
    delete: async (userId, postId) => {
        return await db_1.db.delete(bookmark_schema_1.bookmarkSchema).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(bookmark_schema_1.bookmarkSchema.userId, userId), (0, drizzle_orm_1.eq)(bookmark_schema_1.bookmarkSchema.postId, postId)));
    },
    selectOne: async (userId, postId) => {
        return (await db_1.db.select().from(bookmark_schema_1.bookmarkSchema).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(bookmark_schema_1.bookmarkSchema.userId, userId), (0, drizzle_orm_1.eq)(bookmark_schema_1.bookmarkSchema.postId, postId))))[0];
    },
    selectUserBookmarks: async (userId) => {
        const results = await db_1.db.select({
            bookmarkId: bookmark_schema_1.bookmarkSchema.id,
            postId: post_schema_1.postSchema.id,
            caption: post_schema_1.postSchema.caption,
            location: post_schema_1.postSchema.location,
            createdAt: post_schema_1.postSchema.createdAt,
            creatorId: post_schema_1.postSchema.creatorId
        })
            .from(bookmark_schema_1.bookmarkSchema)
            .innerJoin(post_schema_1.postSchema, (0, drizzle_orm_1.eq)(bookmark_schema_1.bookmarkSchema.postId, post_schema_1.postSchema.id))
            .where((0, drizzle_orm_1.eq)(bookmark_schema_1.bookmarkSchema.userId, userId));
        return results;
    },
    countByPostId: async (postId) => {
        const result = await db_1.db.select({ value: (0, drizzle_orm_1.count)() })
            .from(bookmark_schema_1.bookmarkSchema)
            .where((0, drizzle_orm_1.eq)(bookmark_schema_1.bookmarkSchema.postId, postId));
        return result[0].value;
    }
};
//# sourceMappingURL=bookmark.repository.js.map