"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const JWT_service_1 = __importDefault(require("../services/JWT.service"));
const db_1 = require("../db");
const user_schema_1 = require("../db/schemas/user.schema");
const drizzle_orm_1 = require("drizzle-orm");
const AppError_1 = require("../types/AppError");
const http_status_codes_1 = require("http-status-codes");
const authenticateUser = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;
    // console.log("Cookies: ", req.cookies)
    try {
        if (!accessToken && !refreshToken) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                name: "Unauthorized",
                description: "Authentication required!",
            });
        }
        let user = null;
        // First, try to verify the access token
        if (accessToken) {
            try {
                const decoded = JWT_service_1.default.verifyAccessToken(accessToken);
                const [foundUser] = await db_1.db
                    .select()
                    .from(user_schema_1.userSchema)
                    .where((0, drizzle_orm_1.eq)(user_schema_1.userSchema.id, decoded.userId));
                user = foundUser || null;
                if (user) {
                    req.user = user;
                    console.log("\t:>>> Access token present");
                    // console.log("\t:>>> User: ", user)
                    return next();
                }
            }
            catch (error) {
                // Access token invalid/expired, continue to refresh token
            }
        }
        // If access token is invalid/expired or missing, try to refresh using the refresh token
        if (refreshToken) {
            try {
                const decodedRefresh = JWT_service_1.default.verifyRefreshToken(refreshToken);
                const [foundUser] = await db_1.db
                    .select()
                    .from(user_schema_1.userSchema)
                    .where((0, drizzle_orm_1.eq)(user_schema_1.userSchema.id, decodedRefresh.userId));
                user = foundUser || null;
                if (user) {
                    // Generate new access token since we're using refresh token
                    const newAccessToken = JWT_service_1.default.signAccessToken({
                        userId: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                    });
                    res.cookie("accessToken", newAccessToken, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true,
                        maxAge: 60 * 60 * 1000,
                    });
                    req.user = user;
                    console.log("\t:>>> Refresh token present");
                    return next();
                }
            }
            catch (error) {
                // Refresh token also invalid
                throw new AppError_1.AppError({
                    httpCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                    name: "Unauthorized",
                    description: "Both authentication token are missing!",
                });
            }
        }
        if (!user) {
            // Clear invalid tokens
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                name: "Unauthorized",
                description: "User not found or session expired!",
            });
        }
        // If we reach here, no valid tokens were provided
        throw new AppError_1.AppError({
            httpCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            name: "Unauthorized",
            description: "Authentication required!",
        });
    }
    catch (error) {
        console.error(`[Auth Error] ${error.message}`);
        throw new AppError_1.AppError({
            httpCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            name: "Unauthorized",
            description: "Unauthorized access!",
        });
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=authenticateUser.middleware.js.map