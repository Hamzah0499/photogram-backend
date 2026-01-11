import { db } from "../../db";
import { postSchema } from "../../db/schemas/post.schema";
import { eq, desc, sql } from "drizzle-orm";
import { createPostDtoType } from "../../db/schemas/post.schema";
import { mediaSchema } from "../../db/schemas/media.schema";
import { userSchema } from "../../db/schemas/user.schema";
import { reactionSchema } from "../../db/schemas/reaction.schema";
import { bookmarkSchema } from "../../db/schemas/bookmark.schema";

export const postRepository = {
    insert: async (post: createPostDtoType) => {
        return (await db.insert(postSchema).values(post))[0].insertId;
    },

    selectById: async (id: number) => {
        return (await db.select().from(postSchema).where(eq(postSchema.id, id)))[0];
    },

    selectAll: async () => {
        return await db.select().from(postSchema);
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

        const result = await db
            .select({
                post: postSchema,
                creator: userSchema,
                likes: reactionSchema,
                bookmarkedUsers: bookmarkSchema,
                likesCount: sql<number>`
      COUNT(DISTINCT ${reactionSchema.id})
    `,

                images: sql<string>`
      GROUP_CONCAT(DISTINCT ${mediaSchema.blobUrl})
    `,
            })
            .from(postSchema)
            .leftJoin(userSchema, eq(postSchema.creatorId, userSchema.id))
            .leftJoin(mediaSchema, eq(postSchema.id, mediaSchema.postId))
            .leftJoin(reactionSchema, eq(postSchema.id, reactionSchema.postId))
            .leftJoin(bookmarkSchema, eq(postSchema.id, bookmarkSchema.postId))
            .groupBy(postSchema.id, userSchema.id, reactionSchema.id, bookmarkSchema.id)
            .orderBy(desc(postSchema.createdAt));


        return result.map((row) => ({
            ...row.post,
            creator: row.creator,
            media: row.images ? row.images.split(",").map((img: string) => img.trim()) : [],
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

    updateById: async (id: number, values: any) => {
        return await db.update(postSchema).set(values).where(eq(postSchema.id, id));
    },

    deleteById: async (id: number) => {
        return await db.delete(postSchema).where(eq(postSchema.id, id));
    },

    selectByUsername: async (username: string) => {
        const result = await db
            .select({
                post: postSchema,
                creator: userSchema,
                images: sql<string>`GROUP_CONCAT(${mediaSchema.blobUrl} SEPARATOR ',')`,
            })
            .from(postSchema)
            .innerJoin(userSchema, eq(postSchema.creatorId, userSchema.id))
            .leftJoin(mediaSchema, eq(postSchema.id, mediaSchema.postId))
            .where(eq(userSchema.username, username))
            .groupBy(postSchema.id);

        return result.map((row) => ({
            ...row.post,
            creator: row.creator,
            media: row.images ? row.images.split(",").map((img: string) => img.trim()) : [],
        }));
    },

    search: async (query: string) => {
        const result = await db
            .select({
                post: postSchema,
                creator: userSchema,
                images: sql<string>`GROUP_CONCAT(${mediaSchema.blobUrl} SEPARATOR ',')`,
            })
            .from(postSchema)
            .leftJoin(mediaSchema, eq(postSchema.id, mediaSchema.postId))
            .leftJoin(userSchema, eq(postSchema.creatorId, userSchema.id))
            .where(sql`${postSchema.caption} LIKE ${`%${query}%`}`)
            .groupBy(postSchema.id);

        return result.map((row) => ({
            ...row.post,
            creator: row.creator,
            media: row.images ? row.images.split(",").map((img: string) => img.trim()) : [],
        }));
    },

    selectExplore: async () => {
        // Simple explore: get latest posts or random
        const result = await db
            .select({
                post: postSchema,
                creator: userSchema,
                images: sql<string>`GROUP_CONCAT(${mediaSchema.blobUrl} SEPARATOR ',')`,
            })
            .from(postSchema)
            .leftJoin(mediaSchema, eq(postSchema.id, mediaSchema.postId))
            .leftJoin(userSchema, eq(postSchema.creatorId, userSchema.id))
            .groupBy(postSchema.id)
            .orderBy(sql`RAND()`)
            .limit(30);

        return result.map((row) => ({
            ...row.post,
            creator: row.creator,
            media: row.images ? row.images.split(",").map((img: string) => img.trim()) : [],
        }));
    }
};
