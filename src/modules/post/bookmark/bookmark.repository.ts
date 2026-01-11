import { db } from "../../../db";
import { bookmarkSchema, createBookmarkDtoType } from "../../../db/schemas/bookmark.schema";
import { postSchema } from "../../../db/schemas/post.schema";
import { mediaSchema } from "../../../db/schemas/media.schema";
import { eq, and, count } from "drizzle-orm";

export const bookmarkRepository = {
    insert: async (data: createBookmarkDtoType) => {
        return (await db.insert(bookmarkSchema).values(data))[0].insertId;
    },

    delete: async (userId: number, postId: number) => {
        return await db.delete(bookmarkSchema).where(
            and(
                eq(bookmarkSchema.userId, userId),
                eq(bookmarkSchema.postId, postId)
            )
        );
    },

    selectOne: async (userId: number, postId: number) => {
        return (await db.select().from(bookmarkSchema).where(
            and(
                eq(bookmarkSchema.userId, userId),
                eq(bookmarkSchema.postId, postId)
            )
        ))[0];
    },

    selectUserBookmarks: async (userId: number) => {
        const results = await db.select({
            bookmarkId: bookmarkSchema.id,
            postId: postSchema.id,
            caption: postSchema.caption,
            location: postSchema.location,
            createdAt: postSchema.createdAt,
            creatorId: postSchema.creatorId
        })
            .from(bookmarkSchema)
            .innerJoin(postSchema, eq(bookmarkSchema.postId, postSchema.id))
            .where(eq(bookmarkSchema.userId, userId));

        return results;
    },

    countByPostId: async (postId: number) => {
        const result = await db.select({ value: count() })
            .from(bookmarkSchema)
            .where(eq(bookmarkSchema.postId, postId));
        return result[0].value;
    }
};
