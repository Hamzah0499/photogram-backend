"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = require("drizzle-orm/mysql2");
// const db = drizzle(process.env.DATABASE_URL!);
exports.db = (0, mysql2_1.drizzle)(process.env.DATABASE_URL);
//# sourceMappingURL=index.js.map