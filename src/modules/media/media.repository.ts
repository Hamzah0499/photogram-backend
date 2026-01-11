import { db } from "../../db";
import { mediaSchema } from "../../db/schemas/media.schema";
import { eq } from "drizzle-orm";
import { createMediaDtoType } from "../../db/schemas/media.schema";

export const mediaRepository = {
    insert: async (media: createMediaDtoType) => {
        return (await db.insert(mediaSchema).values(media))[0].insertId;
    },

    selectByPostId: async (postId: number) => {
        return await db.select().from(mediaSchema).where(eq(mediaSchema.postId, postId));
    },

    deleteById: async (id: number) => {
        return await db.delete(mediaSchema).where(eq(mediaSchema.id, id));
    }
};
