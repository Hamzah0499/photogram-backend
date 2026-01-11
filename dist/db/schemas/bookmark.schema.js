"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectBookmarkDtoSchema = exports.createBookmarkDtoSchema = exports.bookmarkSchema = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const post_schema_1 = require("./post.schema");
const user_schema_1 = require("./user.schema");
const drizzle_zod_1 = require("drizzle-zod");
// BOOKMARKS
exports.bookmarkSchema = (0, mysql_core_1.mysqlTable)("bookmarks", {
    id: (0, mysql_core_1.int)("id").primaryKey().autoincrement(),
    userId: (0, mysql_core_1.int)("user_id").references(() => user_schema_1.userSchema.id, {
        onDelete: 'cascade'
    }).notNull(),
    postId: (0, mysql_core_1.int)("post_id").references(() => post_schema_1.postSchema.id, {
        onDelete: 'cascade'
    }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow(),
}, (table) => ({
    // A user can bookmark a post only once
    userIdPostIdIndex: (0, mysql_core_1.uniqueIndex)("user_id_post_id_idx").on(table.userId, table.postId),
}));
/* =========================================================
            VALIDATIONS
========================================================= */
exports.createBookmarkDtoSchema = (0, drizzle_zod_1.createInsertSchema)(exports.bookmarkSchema);
exports.selectBookmarkDtoSchema = (0, drizzle_zod_1.createSelectSchema)(exports.bookmarkSchema);
//# sourceMappingURL=bookmark.schema.js.map