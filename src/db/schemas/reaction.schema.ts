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

// REACTIONS
export const reactionSchema = mysqlTable("reactions", {
    id: int("id").primaryKey().autoincrement(),

    postId: int("post_id").references(() => postSchema.id, {
        onDelete: 'cascade'
    }),     // which post is reacted to
    userId: int("user_id").references(() => userSchema.id, {
        onDelete: 'cascade'
    }),     // who reacted

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow()
});



/* =========================================================
            VALIDATIONS
========================================================= */

export const createReactionDtoSchema = createInsertSchema(reactionSchema);
export type createReactionDtoType = z.infer<typeof createReactionDtoSchema>;

export const updateReactionDtoSchema = createUpdateSchema(reactionSchema);
export type updateReactionDtoType = z.infer<typeof updateReactionDtoSchema>;

export const selectReactionDtoSchema = createSelectSchema(reactionSchema);
export type selectReactionDtoType = z.infer<typeof selectReactionDtoSchema>;