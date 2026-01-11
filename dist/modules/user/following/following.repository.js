"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followingRepository = void 0;
const db_1 = require("../../../db");
const following_schema_1 = require("../../../db/schemas/following.schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.followingRepository = {
    insert: async (userId, followingId) => {
        return await db_1.db.insert(following_schema_1.followingSchema).values({
            userId, // who is following
            followingId, // who is followed
        });
    },
    delete: async (userId, followingId) => {
        return await db_1.db.delete(following_schema_1.followingSchema).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(following_schema_1.followingSchema.userId, userId), (0, drizzle_orm_1.eq)(following_schema_1.followingSchema.followingId, followingId)));
    },
    getFollowing: async (userId) => {
        return await db_1.db.select().from(following_schema_1.followingSchema).where((0, drizzle_orm_1.eq)(following_schema_1.followingSchema.userId, userId));
    },
    getFollowers: async (userId) => {
        return await db_1.db.select().from(following_schema_1.followingSchema).where((0, drizzle_orm_1.eq)(following_schema_1.followingSchema.followingId, userId));
    },
    isFollowing: async (userId, followedId) => {
        const result = await db_1.db.select().from(following_schema_1.followingSchema).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(following_schema_1.followingSchema.userId, userId), (0, drizzle_orm_1.eq)(following_schema_1.followingSchema.followingId, followedId)));
        return result.length > 0;
    }
};
//# sourceMappingURL=following.repository.js.map