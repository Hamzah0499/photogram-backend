"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCommentDtoSchema = exports.updateCommentDtoSchema = exports.createCommentDtoSchema = exports.commentSchema = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const post_schema_1 = require("./post.schema");
const user_schema_1 = require("./user.schema");
const drizzle_zod_1 = require("drizzle-zod");
// COMMENTS
exports.commentSchema = (0, mysql_core_1.mysqlTable)("comments", {
    id: (0, mysql_core_1.int)("id").primaryKey().autoincrement(),
    postId: (0, mysql_core_1.int)("post_id").references(() => post_schema_1.postSchema.id, {
        onDelete: 'cascade',
    }), // which post
    userId: (0, mysql_core_1.int)("user_id").references(() => user_schema_1.userSchema.id, {
        onDelete: 'cascade',
    }), // who commented
    text: (0, mysql_core_1.varchar)("text", { length: 500 }).notNull(), // comment text
    sentiment: (0, mysql_core_1.varchar)("sentiment", { length: 20 }), // positive / negative / neutral
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow()
});
/* =========================================================
            VALIDATIONS
========================================================= */
exports.createCommentDtoSchema = (0, drizzle_zod_1.createInsertSchema)(exports.commentSchema);
exports.updateCommentDtoSchema = (0, drizzle_zod_1.createUpdateSchema)(exports.commentSchema);
exports.selectCommentDtoSchema = (0, drizzle_zod_1.createSelectSchema)(exports.commentSchema);
//# sourceMappingURL=comment.schema.js.map