import {
    mysqlTable,
    serial,
    varchar,
    int,
    timestamp
} from "drizzle-orm/mysql-core";
import { postSchema } from "./post.schema";
import { userSchema } from "./user.schema";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod/v4";


// COMMENTS
export const commentSchema = mysqlTable("comments", {
    id: int("id").primaryKey().autoincrement(),

    postId: int("post_id").references(() => postSchema.id, {
        onDelete: 'cascade',
    }), // which post
    userId: int("user_id").references(() => userSchema.id, {
        onDelete: 'cascade',
    }), // who commented
    text: varchar("text", { length: 500 }).notNull(),  // comment text
    sentiment: varchar("sentiment", { length: 20 }), // positive / negative / neutral

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow()
});



/* =========================================================
            VALIDATIONS
========================================================= */

export const createCommentDtoSchema = createInsertSchema(commentSchema);
export type createCommentDtoType = z.infer<typeof createCommentDtoSchema>;

export const updateCommentDtoSchema = createUpdateSchema(commentSchema);
export type updateCommentDtoType = z.infer<typeof updateCommentDtoSchema>;

export const selectCommentDtoSchema = createSelectSchema(commentSchema);
export type selectCommentDtoType = z.infer<typeof selectCommentDtoSchema>;