import {
    mysqlTable,
    serial,
    varchar,
    int,
    timestamp
} from "drizzle-orm/mysql-core";
import { userSchema } from "./user.schema";
import { commentSchema } from "./comment.schema";
import z from "zod";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";

// REPLY
export const replySchema = mysqlTable("replies", {
    id: int("id").primaryKey().autoincrement(),

    commentId: int("comment_id").references(() => commentSchema.id, {
        onDelete: 'cascade',
    }),     // which comment is replied to
    userId: int("user_id").references(() => userSchema.id, {
        onDelete: 'cascade',
    }),     // who replied
    text: varchar("text", { length: 500 }),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow()
});



/* =========================================================
            VALIDATIONS
========================================================= */

export const createReplyDtoSchema = createInsertSchema(replySchema);
export type createReplyDtoType = z.infer<typeof createReplyDtoSchema>;

export const updateReplyDtoSchema = createUpdateSchema(replySchema);
export type updateReplyDtoType = z.infer<typeof updateReplyDtoSchema>;

export const selectReplyDtoSchema = createSelectSchema(replySchema);
export type selectReplyDtoType = z.infer<typeof selectReplyDtoSchema>;