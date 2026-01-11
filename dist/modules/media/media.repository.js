"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaRepository = void 0;
const db_1 = require("../../db");
const media_schema_1 = require("../../db/schemas/media.schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.mediaRepository = {
    insert: async (media) => {
        return (await db_1.db.insert(media_schema_1.mediaSchema).values(media))[0].insertId;
    },
    selectByPostId: async (postId) => {
        return await db_1.db.select().from(media_schema_1.mediaSchema).where((0, drizzle_orm_1.eq)(media_schema_1.mediaSchema.postId, postId));
    },
    deleteById: async (id) => {
        return await db_1.db.delete(media_schema_1.mediaSchema).where((0, drizzle_orm_1.eq)(media_schema_1.mediaSchema.id, id));
    }
};
//# sourceMappingURL=media.repository.js.map