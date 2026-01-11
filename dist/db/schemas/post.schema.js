"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectPostDtoSchema = exports.updatePostDtoSchema = exports.createPostDtoSchema = exports.postSchema = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const user_schema_1 = require("./user.schema");
const drizzle_zod_1 = require("drizzle-zod");
// POSTS
exports.postSchema = (0, mysql_core_1.mysqlTable)("posts", {
    id: (0, mysql_core_1.int)("id").primaryKey().autoincrement(),
    creatorId: (0, mysql_core_1.int)("creator_id").references(() => user_schema_1.userSchema.id, {
        onDelete: 'cascade',
    }),
    caption: (0, mysql_core_1.varchar)("caption", { length: 500 }),
    location: (0, mysql_core_1.varchar)("location", { length: 200 }),
    people: (0, mysql_core_1.varchar)("people", { length: 255 }),
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow()
});
/* =========================================================
            VALIDATIONS
========================================================= */
exports.createPostDtoSchema = (0, drizzle_zod_1.createInsertSchema)(exports.postSchema);
exports.updatePostDtoSchema = (0, drizzle_zod_1.createUpdateSchema)(exports.postSchema);
exports.selectPostDtoSchema = (0, drizzle_zod_1.createSelectSchema)(exports.postSchema);
//# sourceMappingURL=post.schema.js.map