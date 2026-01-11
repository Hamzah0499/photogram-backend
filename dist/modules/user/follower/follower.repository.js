"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followerRepository = void 0;
const db_1 = require("../../../db");
const follower_schema_1 = require("../../../db/schemas/follower.schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.followerRepository = {
    insert: async (userId, followerId) => {
        return await db_1.db.insert(follower_schema_1.followerSchema).values({
            userId, // follower
            followerId, // followed
        });
    },
    delete: async (userId, followerId) => {
        return await db_1.db.delete(follower_schema_1.followerSchema).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(follower_schema_1.followerSchema.userId, userId), (0, drizzle_orm_1.eq)(follower_schema_1.followerSchema.followerId, followerId)));
    },
    getFollowers: async (userId) => {
        // userId here is the person BEING followed (followerId in the schema according to comments)
        // Wait, the comment in schema said: userID: who is following, followerID: who is followed.
        // So to get followers of X, we need to find rows where followerId = X.
        return await db_1.db.select().from(follower_schema_1.followerSchema).where((0, drizzle_orm_1.eq)(follower_schema_1.followerSchema.followerId, userId));
    },
    getFollowing: async (userId) => {
        // to get who X follows, we need to find rows where userId = X.
        return await db_1.db.select().from(follower_schema_1.followerSchema).where((0, drizzle_orm_1.eq)(follower_schema_1.followerSchema.userId, userId));
    },
    isFollowing: async (userId, followedId) => {
        const result = await db_1.db.select().from(follower_schema_1.followerSchema).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(follower_schema_1.followerSchema.userId, userId), (0, drizzle_orm_1.eq)(follower_schema_1.followerSchema.followerId, followedId)));
        return result.length > 0;
    }
};
//# sourceMappingURL=follower.repository.js.map