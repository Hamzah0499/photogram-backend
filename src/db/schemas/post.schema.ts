import {
    mysqlTable,
    serial,
    varchar,
    int,
    timestamp
} from "drizzle-orm/mysql-core";
import { userSchema } from "./user.schema";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod/v4";


// POSTS
export const postSchema = mysqlTable("posts", {
    id: int("id").primaryKey().autoincrement(),

    creatorId: int("creator_id").references(() => userSchema.id, {
        onDelete: 'cascade',
    }),
    caption: varchar("caption", { length: 500 }),
    location: varchar("location", { length: 200 }),
    people: varchar("people", { length: 255 }),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow()
});



/* =========================================================
            VALIDATIONS
========================================================= */

export const createPostDtoSchema = createInsertSchema(postSchema);
export type createPostDtoType = z.infer<typeof createPostDtoSchema>;

export const updatePostDtoSchema = createUpdateSchema(postSchema);
export type updatePostDtoType = z.infer<typeof updatePostDtoSchema>;

export const selectPostDtoSchema = createSelectSchema(postSchema);
export type selectPostDtoType = z.infer<typeof selectPostDtoSchema>;