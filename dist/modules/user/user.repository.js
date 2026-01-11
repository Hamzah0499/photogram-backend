"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const db_1 = require("../../db");
const user_schema_1 = require("../../db/schemas/user.schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.userRepository = {
    INSERT: async (user) => {
        return (await db_1.db.insert(user_schema_1.userSchema).values(user))[0].insertId;
    },
    SELECT_BY_EMAIL: async (email) => {
        return (await db_1.db.select().from(user_schema_1.userSchema).where((0, drizzle_orm_1.eq)(user_schema_1.userSchema.email, email)))[0];
    },
    SELECT_BY_USERNAME: async (username) => {
        const result = await db_1.db.select({
            user: user_schema_1.userSchema,
            followersCount: (0, drizzle_orm_1.sql) `(SELECT COUNT(*) FROM followers WHERE follower_id = ${user_schema_1.userSchema.id})`,
            followingCount: (0, drizzle_orm_1.sql) `(SELECT COUNT(*) FROM following WHERE user_id = ${user_schema_1.userSchema.id})`,
        }).from(user_schema_1.userSchema)
            .where((0, drizzle_orm_1.eq)(user_schema_1.userSchema.username, username));
        if (result.length === 0)
            return null;
        return {
            ...result[0].user,
            followersCount: Number(result[0].followersCount),
            followingCount: Number(result[0].followingCount),
        };
    },
    SELECT_BY_ID: async (id) => {
        return (await db_1.db.select().from(user_schema_1.userSchema).where((0, drizzle_orm_1.eq)(user_schema_1.userSchema.id, id)))[0];
    },
    UPDATE_BY_ID: async (id, values) => {
        return await db_1.db.update(user_schema_1.userSchema).set(values)
            .where((0, drizzle_orm_1.eq)(user_schema_1.userSchema.id, id));
    },
    SOFT_DELETE_BY_ID: async (userId) => {
        return await db_1.db.update(user_schema_1.userSchema).set({
            isActive: false,
            deletedAt: new Date(),
        })
            .where((0, drizzle_orm_1.eq)(user_schema_1.userSchema.id, userId));
    },
    PERMANENT_DELETE_BY_ID: async (userId) => {
        return await db_1.db.delete(user_schema_1.userSchema)
            .where((0, drizzle_orm_1.eq)(user_schema_1.userSchema.id, userId));
    },
    RESTORE_BY_ID: async (userId) => {
        return await db_1.db.update(user_schema_1.userSchema).set({
            isActive: true,
            deletedAt: null,
        })
            .where((0, drizzle_orm_1.eq)(user_schema_1.userSchema.id, userId));
    },
    SEARCH: async (query) => {
        return await db_1.db.select().from(user_schema_1.userSchema).where((0, drizzle_orm_1.or)((0, drizzle_orm_1.sql) `${user_schema_1.userSchema.username} LIKE ${`%${query}%`}`, (0, drizzle_orm_1.sql) `${user_schema_1.userSchema.name} LIKE ${`%${query}%`}`));
    },
};
//# sourceMappingURL=user.repository.js.map