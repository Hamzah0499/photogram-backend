"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginUserDtoSchema = exports.selectUserDtoSchema = exports.updateUserDtoSchema = exports.createUserDtoSchema = exports.userSchema = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const mysql_core_2 = require("drizzle-orm/mysql-core");
const mysql_core_3 = require("drizzle-orm/mysql-core");
const drizzle_zod_1 = require("drizzle-zod");
const v4_1 = require("zod/v4");
// USERS
exports.userSchema = (0, mysql_core_3.mysqlTable)("users", {
    id: (0, mysql_core_3.int)("id").primaryKey().autoincrement(),
    name: (0, mysql_core_3.varchar)("name", { length: 100 }),
    username: (0, mysql_core_3.varchar)("username", { length: 100 }).unique(),
    email: (0, mysql_core_3.varchar)("email", { length: 150 }).unique(),
    password: (0, mysql_core_3.varchar)("password", { length: 255 }),
    avatar: (0, mysql_core_3.varchar)("avatar", { length: 255 }),
    role: (0, mysql_core_1.mysqlEnum)("role", ["creator", "consumer"]).notNull().default("consumer"), // creator / consumer
    type: (0, mysql_core_1.mysqlEnum)("type", ["digital creator", "musician", "gamer", "youtuber", "member"]).notNull().default("member"), // Digital creator, etc
    bio: (0, mysql_core_3.varchar)("bio", { length: 500 }),
    dateOfBirth: (0, mysql_core_1.date)("date_of_birth"),
    gender: (0, mysql_core_1.mysqlEnum)("gender", ["male", "female", "other"]).notNull().default("other"),
    phone: (0, mysql_core_3.varchar)("phone", { length: 20 }),
    isVerified: (0, mysql_core_1.boolean)("is_verified").notNull().default(false),
    isBlocked: (0, mysql_core_1.boolean)("is_blocked").notNull().default(false),
    isActive: (0, mysql_core_1.boolean)("is_active").notNull().default(true),
    createdAt: (0, mysql_core_3.timestamp)("created_at").defaultNow(),
    updatedAt: (0, mysql_core_3.timestamp)("updated_at").defaultNow().onUpdateNow(),
    deletedAt: (0, mysql_core_2.datetime)("deleted_at")
});
/* =========================================================
            VALIDATIONS
========================================================= */
exports.createUserDtoSchema = (0, drizzle_zod_1.createInsertSchema)(exports.userSchema, {
    dateOfBirth: v4_1.z.string().transform((dateOfBirth) => new Date(dateOfBirth)).optional(),
});
exports.updateUserDtoSchema = (0, drizzle_zod_1.createUpdateSchema)(exports.userSchema, {
    dateOfBirth: v4_1.z.string().transform((dateOfBirth) => new Date(dateOfBirth)).optional(),
    deletedAt: v4_1.z.string().transform((deletedAt) => new Date(deletedAt)).optional()
});
exports.selectUserDtoSchema = (0, drizzle_zod_1.createSelectSchema)(exports.userSchema);
exports.loginUserDtoSchema = v4_1.z.object({
    username: v4_1.z.string()
        .regex(/^[a-zA-Z0-9_]{3,20}$/, "Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores")
        .trim().optional(),
    email: v4_1.z
        .string()
        .email("Invalid email address")
        .regex(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|kips\.edu\.pk)$/, "Only Gmail, Yahoo, Outlook, Hotmail, or kips.edu.pk email addresses are allowed")
        .trim().optional(),
    password: v4_1.z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,24}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        .min(8, "Password must be at least 8 characters")
        .max(24, "Password must be at most 24 characters")
        .trim(),
});
exports.forgotPasswordSchema = v4_1.z.object({
    email: v4_1.z.string().email("Invalid email address").trim(),
});
exports.resetPasswordSchema = v4_1.z.object({
    password: v4_1.z.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,24}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        .min(8, "Password must be at least 8 characters")
        .max(24, "Password must be at most 24 characters")
        .trim(),
});
//# sourceMappingURL=user.schema.js.map