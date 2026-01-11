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


// FOLLOWERS
export const followerSchema = mysqlTable("followers", {
    id: int("id").primaryKey().autoincrement(),

    userId: int("user_id").references(() => userSchema.id, {
        onDelete: 'cascade'
    }), // who is following
    followerId: int("follower_id").references(() => userSchema.id, {
        onDelete: 'cascade'
    }), // who is followed

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow()
});


/* =========================================================
            VALIDATIONS
========================================================= */

export const createFollowerDtoSchema = createInsertSchema(followerSchema);
export type createFollowerDtoType = z.infer<typeof createFollowerDtoSchema>;

export const updateFollowerDtoSchema = createUpdateSchema(followerSchema);
export type updateFollowerDtoType = z.infer<typeof updateFollowerDtoSchema>;

export const selectFollowerDtoSchema = createSelectSchema(followerSchema);
export type selectFollowerDtoType = z.infer<typeof selectFollowerDtoSchema>;