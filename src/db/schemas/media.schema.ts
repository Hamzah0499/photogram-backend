import {
    mysqlTable,
    serial,
    varchar,
    int,
    timestamp,
    boolean,
    text
} from "drizzle-orm/mysql-core";
import { postSchema } from "./post.schema";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod/v4";


// MEDIA
export const mediaSchema = mysqlTable("media", {
    id: int("id").primaryKey().autoincrement(),

    postId: int("post_id").references(() => postSchema.id, {
        onDelete: 'cascade'
    }),
    title: varchar("title", { length: 200 }),
    type: varchar("type", { length: 20 }), // image / video
    blobUrl: varchar("blob_url", { length: 500 }),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow()
});


/* =========================================================
            VALIDATIONS
========================================================= */

export const createMediaDtoSchema = createInsertSchema(mediaSchema);
export type createMediaDtoType = z.infer<typeof createMediaDtoSchema>;

export const updateMediaDtoSchema = createUpdateSchema(mediaSchema);
export type updateMediaDtoType = z.infer<typeof updateMediaDtoSchema>;

export const selectMediaDtoSchema = createSelectSchema(mediaSchema);
export type selectMediaDtoType = z.infer<typeof selectMediaDtoSchema>;