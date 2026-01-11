"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectMediaDtoSchema = exports.updateMediaDtoSchema = exports.createMediaDtoSchema = exports.mediaSchema = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const post_schema_1 = require("./post.schema");
const drizzle_zod_1 = require("drizzle-zod");
// MEDIA
exports.mediaSchema = (0, mysql_core_1.mysqlTable)("media", {
    id: (0, mysql_core_1.int)("id").primaryKey().autoincrement(),
    postId: (0, mysql_core_1.int)("post_id").references(() => post_schema_1.postSchema.id, {
        onDelete: 'cascade'
    }),
    title: (0, mysql_core_1.varchar)("title", { length: 200 }),
    type: (0, mysql_core_1.varchar)("type", { length: 20 }), // image / video
    blobUrl: (0, mysql_core_1.varchar)("blob_url", { length: 500 }),
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow()
});
/* =========================================================
            VALIDATIONS
========================================================= */
exports.createMediaDtoSchema = (0, drizzle_zod_1.createInsertSchema)(exports.mediaSchema);
exports.updateMediaDtoSchema = (0, drizzle_zod_1.createUpdateSchema)(exports.mediaSchema);
exports.selectMediaDtoSchema = (0, drizzle_zod_1.createSelectSchema)(exports.mediaSchema);
//# sourceMappingURL=media.schema.js.map