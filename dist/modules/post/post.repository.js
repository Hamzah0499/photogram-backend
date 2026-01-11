"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const db_1 = require("../../db");
const post_schema_1 = require("../../db/schemas/post.schema");
const drizzle_orm_1 = require("drizzle-orm");
const media_schema_1 = require("../../db/schemas/media.schema");
const user_schema_1 = require("../../db/schemas/user.schema");
const reaction_schema_1 = require("../../db/schemas/reaction.schema");
const bookmark_schema_1 = require("../../db/schemas/bookmark.schema");
exports.postRepository = {
    insert: async (post) => {
        return (await db_1.db.insert(post_schema_1.postSchema).values(post))[0].insertId;
    },
    selectById: async (id) => {
        return (await db_1.db.select().from(post_schema_1.postSchema).where((0, drizzle_orm_1.eq)(post_schema_1.postSchema.id, id)))[0];
    },
    selectAll: async () => {
        return await db_1.db.select().from(post_schema_1.postSchema);
    },
    selectAllPostWithCreator: async () => {
        // const result = await db
        //     .select({
        //         post: postSchema,
        //         creator: userSchema,
        //         likes: reactionSchema,
        //         likesCount: sql<number>`COUNT(${reactionSchema.id})`,
        //         images: sql<string>`GROUP_CONCAT(${mediaSchema.blobUrl} SEPARATOR ',')`,
        //         bookmarkedUsers: bookmarkSchema,
        //     })
        //     .from(postSchema)
        //     .leftJoin(mediaSchema, eq(postSchema.id, mediaSchema.postId))
        //     .leftJoin(userSchema, eq(postSchema.creatorId, userSchema.id))
        //     .leftJoin(reactionSchema, eq(postSchema.id, reactionSchema.postId))
        //     .leftJoin(bookmarkSchema, eq(postSchema.id, bookmarkSchema.postId))
        //     .groupBy(postSchema.id, userSchema.id)
        //     .orderBy(desc(postSchema.createdAt))
        const result = await db_1.db
            .select({
            post: post_schema_1.postSchema,
            creator: user_schema_1.userSchema,
            likes: reaction_schema_1.reactionSchema,
            bookmarkedUsers: bookmark_schema_1.bookmarkSchema,
            likesCount: (0, drizzle_orm_1.sql) `
      COUNT(DISTINCT ${reaction_schema_1.reactionSchema.id})
    `,
            images: (0, drizzle_orm_1.sql) `
      GROUP_CONCAT(DISTINCT ${media_schema_1.mediaSchema.blobUrl})
    `,
        })
            .from(post_schema_1.postSchema)
            .leftJoin(user_schema_1.userSchema, (0, drizzle_orm_1.eq)(post_schema_1.postSchema.creatorId, user_schema_1.userSchema.id))
            .leftJoin(media_schema_1.mediaSchema, (0, drizzle_orm_1.eq)(post_schema_1.postSchema.id, media_schema_1.mediaSchema.postId))
            .leftJoin(reaction_schema_1.reactionSchema, (0, drizzle_orm_1.eq)(post_schema_1.postSchema.id, reaction_schema_1.reactionSchema.postId))
            .leftJoin(bookmark_schema_1.bookmarkSchema, (0, drizzle_orm_1.eq)(post_schema_1.postSchema.id, bookmark_schema_1.bookmarkSchema.postId))
            .groupBy(post_schema_1.postSchema.id, user_schema_1.userSchema.id, reaction_schema_1.reactionSchema.id, bookmark_schema_1.bookmarkSchema.id)
            .orderBy((0, drizzle_orm_1.desc)(post_schema_1.postSchema.createdAt));
        return result.map((row) => ({
            ...row.post,
            creator: row.creator,
            media: row.images ? row.images.split(",").map((img) => img.trim()) : [],
            likedUsers: row.likes,
            likesCount: row.likesCount,
            bookmarkedUsers: row.bookmarkedUsers,
        }));
    },
    // selectAllPostWithCreator: async () => {
    //     const result = await db
    //         .select({
    //             post: postSchema,
    //             creator: userSchema,
    //             images: sql<string>`GROUP_CONCAT(${mediaSchema.blobUrl} SEPARATOR ',')`,
    //         })
    //         .from(postSchema)
    //         .leftJoin(mediaSchema, eq(postSchema.id, mediaSchema.postId))
    //         .leftJoin(userSchema, eq(postSchema.creatorId, userSchema.id))
    //         .groupBy(postSchema.id)
    //         .orderBy(desc(postSchema.createdAt));
    //     return result.map((row) => ({
    //         ...row.post,
    //         creator: row.creator,
    //         media: row.images ? row.images.split(",").map((img: string) => img.trim()) : [],
    //     }));
    // },
    updateById: async (id, values) => {
        return await db_1.db.update(post_schema_1.postSchema).set(values).where((0, drizzle_orm_1.eq)(post_schema_1.postSchema.id, id));
    },
    deleteById: async (id) => {
        return await db_1.db.delete(post_schema_1.postSchema).where((0, drizzle_orm_1.eq)(post_schema_1.postSchema.id, id));
    },
    selectByUsername: async (username) => {
        const result = await db_1.db
            .select({
            post: post_schema_1.postSchema,
            creator: user_schema_1.userSchema,
            images: (0, drizzle_orm_1.sql) `GROUP_CONCAT(${media_schema_1.mediaSchema.blobUrl} SEPARATOR ',')`,
        })
            .from(post_schema_1.postSchema)
            .innerJoin(user_schema_1.userSchema, (0, drizzle_orm_1.eq)(post_schema_1.postSchema.creatorId, user_schema_1.userSchema.id))
            .leftJoin(media_schema_1.mediaSchema, (0, drizzle_orm_1.eq)(post_schema_1.postSchema.id, media_schema_1.mediaSchema.postId))
            .where((0, drizzle_orm_1.eq)(user_schema_1.userSchema.username, username))
            .groupBy(post_schema_1.postSchema.id);
        return result.map((row) => ({
            ...row.post,
            creator: row.creator,
            media: row.images ? row.images.split(",").map((img) => img.trim()) : [],
        }));
    },
    search: async (query) => {
        const result = await db_1.db
            .select({
            post: post_schema_1.postSchema,
            creator: user_schema_1.userSchema,
            images: (0, drizzle_orm_1.sql) `GROUP_CONCAT(${media_schema_1.mediaSchema.blobUrl} SEPARATOR ',')`,
        })
            .from(post_schema_1.postSchema)
            .leftJoin(media_schema_1.mediaSchema, (0, drizzle_orm_1.eq)(post_schema_1.postSchema.id, media_schema_1.mediaSchema.postId))
            .leftJoin(user_schema_1.userSchema, (0, drizzle_orm_1.eq)(post_schema_1.postSchema.creatorId, user_schema_1.userSchema.id))
            .where((0, drizzle_orm_1.sql) `${post_schema_1.postSchema.caption} LIKE ${`%${query}%`}`)
            .groupBy(post_schema_1.postSchema.id);
        return result.map((row) => ({
            ...row.post,
            creator: row.creator,
            media: row.images ? row.images.split(",").map((img) => img.trim()) : [],
        }));
    },
    selectExplore: async () => {
        // Simple explore: get latest posts or random
        const result = await db_1.db
            .select({
            post: post_schema_1.postSchema,
            creator: user_schema_1.userSchema,
            images: (0, drizzle_orm_1.sql) `GROUP_CONCAT(${media_schema_1.mediaSchema.blobUrl} SEPARATOR ',')`,
        })
            .from(post_schema_1.postSchema)
            .leftJoin(media_schema_1.mediaSchema, (0, drizzle_orm_1.eq)(post_schema_1.postSchema.id, media_schema_1.mediaSchema.postId))
            .leftJoin(user_schema_1.userSchema, (0, drizzle_orm_1.eq)(post_schema_1.postSchema.creatorId, user_schema_1.userSchema.id))
            .groupBy(post_schema_1.postSchema.id)
            .orderBy((0, drizzle_orm_1.sql) `RAND()`)
            .limit(30);
        return result.map((row) => ({
            ...row.post,
            creator: row.creator,
            media: row.images ? row.images.split(",").map((img) => img.trim()) : [],
        }));
    }
};
//# sourceMappingURL=post.repository.js.map