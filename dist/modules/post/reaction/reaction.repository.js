"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionRepository = void 0;
const db_1 = require("../../../db");
const reaction_schema_1 = require("../../../db/schemas/reaction.schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.reactionRepository = {
    insert: async (reaction) => {
        return (await db_1.db.insert(reaction_schema_1.reactionSchema).values(reaction))[0].insertId;
    },
    delete: async (userId, postId) => {
        return await db_1.db.delete(reaction_schema_1.reactionSchema).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(reaction_schema_1.reactionSchema.userId, userId), (0, drizzle_orm_1.eq)(reaction_schema_1.reactionSchema.postId, postId)));
    },
    selectByPostId: async (postId) => {
        return await db_1.db.select().from(reaction_schema_1.reactionSchema).where((0, drizzle_orm_1.eq)(reaction_schema_1.reactionSchema.postId, postId));
    },
    isReacted: async (userId, postId) => {
        const result = await db_1.db.select().from(reaction_schema_1.reactionSchema).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(reaction_schema_1.reactionSchema.userId, userId), (0, drizzle_orm_1.eq)(reaction_schema_1.reactionSchema.postId, postId)));
        return result.length > 0;
    }
};
//# sourceMappingURL=reaction.repository.js.map