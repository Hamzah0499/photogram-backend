import { boolean, date, mysqlEnum } from "drizzle-orm/mysql-core";
import { datetime } from "drizzle-orm/mysql-core";
import {
    mysqlTable,
    varchar,
    int,
    timestamp
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod/v4";

// USERS
export const userSchema = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }),
    username: varchar("username", { length: 100 }).unique(),
    email: varchar("email", { length: 150 }).unique(),
    password: varchar("password", { length: 255 }),

    avatar: varchar("avatar", { length: 255 }),

    role: mysqlEnum("role", ["creator", "consumer"]).notNull().default("consumer"), // creator / consumer
    type: mysqlEnum("type", ["digital creator", "musician", "gamer", "youtuber", "member"]).notNull().default("member"), // Digital creator, etc

    bio: varchar("bio", { length: 500 }),
    dateOfBirth: date("date_of_birth"),
    gender: mysqlEnum("gender", ["male", "female", "other"]).notNull().default("other"),
    phone: varchar("phone", { length: 20 }),


    isVerified: boolean("is_verified").notNull().default(false),
    isBlocked: boolean("is_blocked").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: datetime("deleted_at")
});


/* =========================================================
            VALIDATIONS
========================================================= */

export const createUserDtoSchema = createInsertSchema(userSchema, {
    dateOfBirth: z.string().transform((dateOfBirth) => new Date(dateOfBirth)).optional(),
});
export type createUserDtoType = z.infer<typeof createUserDtoSchema>;

export const updateUserDtoSchema = createUpdateSchema(userSchema, {
    dateOfBirth: z.string().transform((dateOfBirth) => new Date(dateOfBirth)).optional(),

    deletedAt: z.string().transform((deletedAt) => new Date(deletedAt)).optional()
});
export type updateUserDtoType = z.infer<typeof updateUserDtoSchema>;

export const selectUserDtoSchema = createSelectSchema(userSchema);
export type selectUserDtoType = z.infer<typeof selectUserDtoSchema>;

export const loginUserDtoSchema = z.object({
    username: z.string()
        .regex(/^[a-zA-Z0-9_]{3,20}$/, "Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores")
        .trim().optional(),
    email: z
        .string()
        .email("Invalid email address")
        .regex(
            /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|kips\.edu\.pk)$/,
            "Only Gmail, Yahoo, Outlook, Hotmail, or kips.edu.pk email addresses are allowed"
        )
        .trim().optional(),
    password: z
        .string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,24}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .min(8, "Password must be at least 8 characters")
        .max(24, "Password must be at most 24 characters")
        .trim(),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address").trim(),
});

export const resetPasswordSchema = z.object({
    password: z.string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,24}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .min(8, "Password must be at least 8 characters")
        .max(24, "Password must be at most 24 characters")
        .trim(),
});
