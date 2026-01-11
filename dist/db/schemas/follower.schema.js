"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFollowerDtoSchema = exports.updateFollowerDtoSchema = exports.createFollowerDtoSchema = exports.followerSchema = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const user_schema_1 = require("./user.schema");
const drizzle_zod_1 = require("drizzle-zod");
// FOLLOWERS
exports.followerSchema = (0, mysql_core_1.mysqlTable)("followers", {
    id: (0, mysql_core_1.int)("id").primaryKey().autoincrement(),
    userId: (0, mysql_core_1.int)("user_id").references(() => user_schema_1.userSchema.id, {
        onDelete: 'cascade'
    }), // who is following
    followerId: (0, mysql_core_1.int)("follower_id").references(() => user_schema_1.userSchema.id, {
        onDelete: 'cascade'
    }), // who is followed
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow()
});
/* =========================================================
            VALIDATIONS
========================================================= */
exports.createFollowerDtoSchema = (0, drizzle_zod_1.createInsertSchema)(exports.followerSchema);
exports.updateFollowerDtoSchema = (0, drizzle_zod_1.createUpdateSchema)(exports.followerSchema);
exports.selectFollowerDtoSchema = (0, drizzle_zod_1.createSelectSchema)(exports.followerSchema);
//# sourceMappingURL=follower.schema.js.map