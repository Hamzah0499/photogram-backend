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

// FOLLOWING
export const followingSchema = mysqlTable("following", {
    id: int("id").primaryKey().autoincrement(),

    userId: int("user_id").references(() => userSchema.id, {
        onDelete: 'cascade'
    }),     // who is following
    followingId: int("following_id").references(() => userSchema.id, {
        onDelete: 'cascade'
    }), // who is followed

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow()
});


/* =========================================================
            VALIDATIONS
========================================================= */

export const createFollowingDtoSchema = createInsertSchema(followingSchema);
export type createFollowingDtoType = z.infer<typeof createFollowingDtoSchema>;

export const updateFollowingDtoSchema = createUpdateSchema(followingSchema);
export type updateFollowingDtoType = z.infer<typeof updateFollowingDtoSchema>;

export const selectFollowingDtoSchema = createSelectSchema(followingSchema);
export type selectFollowingDtoType = z.infer<typeof selectFollowingDtoSchema>;