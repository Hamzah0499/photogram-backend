"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectReplyDtoSchema = exports.updateReplyDtoSchema = exports.createReplyDtoSchema = exports.replySchema = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const user_schema_1 = require("./user.schema");
const comment_schema_1 = require("./comment.schema");
const drizzle_zod_1 = require("drizzle-zod");
// REPLY
exports.replySchema = (0, mysql_core_1.mysqlTable)("replies", {
    id: (0, mysql_core_1.int)("id").primaryKey().autoincrement(),
    commentId: (0, mysql_core_1.int)("comment_id").references(() => comment_schema_1.commentSchema.id, {
        onDelete: 'cascade',
    }), // which comment is replied to
    userId: (0, mysql_core_1.int)("user_id").references(() => user_schema_1.userSchema.id, {
        onDelete: 'cascade',
    }), // who replied
    text: (0, mysql_core_1.varchar)("text", { length: 500 }),
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow()
});
/* =========================================================
            VALIDATIONS
========================================================= */
exports.createReplyDtoSchema = (0, drizzle_zod_1.createInsertSchema)(exports.replySchema);
exports.updateReplyDtoSchema = (0, drizzle_zod_1.createUpdateSchema)(exports.replySchema);
exports.selectReplyDtoSchema = (0, drizzle_zod_1.createSelectSchema)(exports.replySchema);
//# sourceMappingURL=reply.schema.js.map