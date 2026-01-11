"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFollowingDtoSchema = exports.updateFollowingDtoSchema = exports.createFollowingDtoSchema = exports.followingSchema = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const user_schema_1 = require("./user.schema");
const drizzle_zod_1 = require("drizzle-zod");
// FOLLOWING
exports.followingSchema = (0, mysql_core_1.mysqlTable)("following", {
    id: (0, mysql_core_1.int)("id").primaryKey().autoincrement(),
    userId: (0, mysql_core_1.int)("user_id").references(() => user_schema_1.userSchema.id, {
        onDelete: 'cascade'
    }), // who is following
    followingId: (0, mysql_core_1.int)("following_id").references(() => user_schema_1.userSchema.id, {
        onDelete: 'cascade'
    }), // who is followed
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow()
});
/* =========================================================
            VALIDATIONS
========================================================= */
exports.createFollowingDtoSchema = (0, drizzle_zod_1.createInsertSchema)(exports.followingSchema);
exports.updateFollowingDtoSchema = (0, drizzle_zod_1.createUpdateSchema)(exports.followingSchema);
exports.selectFollowingDtoSchema = (0, drizzle_zod_1.createSelectSchema)(exports.followingSchema);
//# sourceMappingURL=following.schema.js.map