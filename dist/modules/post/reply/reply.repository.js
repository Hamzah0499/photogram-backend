"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyRepository = void 0;
const db_1 = require("../../../db");
const reply_schema_1 = require("../../../db/schemas/reply.schema");
const drizzle_orm_1 = require("drizzle-orm");
exports.replyRepository = {
    insert: async (reply) => {
        return (await db_1.db.insert(reply_schema_1.replySchema).values(reply))[0].insertId;
    },
    selectByCommentId: async (commentId) => {
        return await db_1.db.select().from(reply_schema_1.replySchema).where((0, drizzle_orm_1.eq)(reply_schema_1.replySchema.commentId, commentId));
    },
    deleteById: async (id) => {
        return await db_1.db.delete(reply_schema_1.replySchema).where((0, drizzle_orm_1.eq)(reply_schema_1.replySchema.id, id));
    },
    selectById: async (id) => {
        return (await db_1.db.select().from(reply_schema_1.replySchema).where((0, drizzle_orm_1.eq)(reply_schema_1.replySchema.id, id)))[0];
    }
};
//# sourceMappingURL=reply.repository.js.map