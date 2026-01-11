"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = exports.userRoutes = exports.authorizeRoles = exports.authenticateUser = exports.errorHandler = exports.responseHandler = void 0;
// Middlewares
const responseHandler_1 = __importDefault(require("./middlewares/responseHandler"));
exports.responseHandler = responseHandler_1.default;
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
exports.errorHandler = errorHandler_1.default;
const authenticateUser_middleware_1 = require("./middlewares/authenticateUser.middleware");
Object.defineProperty(exports, "authenticateUser", { enumerable: true, get: function () { return authenticateUser_middleware_1.authenticateUser; } });
const authorizeRoles_middleware_1 = require("./middlewares/authorizeRoles.middleware");
Object.defineProperty(exports, "authorizeRoles", { enumerable: true, get: function () { return authorizeRoles_middleware_1.authorizeRoles; } });
// Routes
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
exports.userRoutes = user_routes_1.default;
const post_routes_1 = __importDefault(require("./modules/post/post.routes"));
exports.postRoutes = post_routes_1.default;
//# sourceMappingURL=index.imports.js.map