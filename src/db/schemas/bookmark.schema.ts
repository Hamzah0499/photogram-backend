import {
    mysqlTable,
    int,
    timestamp,
    uniqueIndex
} from "drizzle-orm/mysql-core";
import { postSchema } from "./post.schema";
import { userSchema } from "./user.schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";


// BOOKMARKS
export const bookmarkSchema = mysqlTable("bookmarks", {
    id: int("id").primaryKey().autoincrement(),

    userId: int("user_id").references(() => userSchema.id, {
        onDelete: 'cascade'
    }).notNull(),
    postId: int("post_id").references(() => postSchema.id, {
        onDelete: 'cascade'
    }).notNull(),

    createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
    // A user can bookmark a post only once
    userIdPostIdIndex: uniqueIndex("user_id_post_id_idx").on(table.userId, table.postId),
}));


/* =========================================================
            VALIDATIONS
========================================================= */

export const createBookmarkDtoSchema = createInsertSchema(bookmarkSchema);
export type createBookmarkDtoType = z.infer<typeof createBookmarkDtoSchema>;

export const selectBookmarkDtoSchema = createSelectSchema(bookmarkSchema);
export type selectBookmarkDtoType = z.infer<typeof selectBookmarkDtoSchema>;
