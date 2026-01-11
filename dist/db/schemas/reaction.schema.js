"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectReactionDtoSchema = exports.updateReactionDtoSchema = exports.createReactionDtoSchema = exports.reactionSchema = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const post_schema_1 = require("./post.schema");
const user_schema_1 = require("./user.schema");
const drizzle_zod_1 = require("drizzle-zod");
// REACTIONS
exports.reactionSchema = (0, mysql_core_1.mysqlTable)("reactions", {
    id: (0, mysql_core_1.int)("id").primaryKey().autoincrement(),
    postId: (0, mysql_core_1.int)("post_id").references(() => post_schema_1.postSchema.id, {
        onDelete: 'cascade'
    }), // which post is reacted to
    userId: (0, mysql_core_1.int)("user_id").references(() => user_schema_1.userSchema.id, {
        onDelete: 'cascade'
    }), // who reacted
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow()
});
/* =========================================================
            VALIDATIONS
========================================================= */
exports.createReactionDtoSchema = (0, drizzle_zod_1.createInsertSchema)(exports.reactionSchema);
exports.updateReactionDtoSchema = (0, drizzle_zod_1.createUpdateSchema)(exports.reactionSchema);
exports.selectReactionDtoSchema = (0, drizzle_zod_1.createSelectSchema)(exports.reactionSchema);
//# sourceMappingURL=reaction.schema.js.map