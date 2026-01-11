"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const http_status_codes_1 = require("http-status-codes");
const isProduction = process.env.NODE_ENV === "production";
exports.UserController = {
    register: async (req, res, next) => {
        const { newUser, accessToken, refreshToken } = await user_service_1.userService.createUser(req.body);
        // Set cookies for access and refresh tokens
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
            maxAge: 3600 * 1000, // 1 hour
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
            maxAge: 3600 * 1000 * 24 * 7, // 7 days
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(newUser);
    },
    login: async (req, res, next) => {
        const { user, accessToken, refreshToken } = await user_service_1.userService.loginUser(req.body);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
            maxAge: 3600 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
            maxAge: 3600 * 1000 * 24 * 7,
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    },
    logout: async (req, res, next) => {
        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
            maxAge: 0,
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
            maxAge: 0,
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Logout successful" });
    },
    refresh: async (req, res, next) => {
        const { user, accessToken, refreshToken } = await user_service_1.userService.refreshUser(req.cookies.refreshToken);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
            maxAge: 3600 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
            maxAge: 3600 * 1000 * 24 * 7,
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    },
    update: async (req, res, next) => {
        const updatedUser = await user_service_1.userService.updateUser(Number(req.params.id), req.body);
        return res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser);
    },
    uploadAvatar: async (req, res, next) => {
        const result = await user_service_1.userService.uploadAvatar(Number(req.params.id), req.file);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    getById: async (req, res, next) => {
        const user = await user_service_1.userService.getUserById(Number(req.params.id));
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    },
    getByUsername: async (req, res, next) => {
        const user = await user_service_1.userService.getUserByUsername(req.params.username);
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    },
    softDelete: async (req, res, next) => {
        await user_service_1.userService.softDeleteUser(Number(req.params.id));
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "User soft deleted" });
    },
    permanentDelete: async (req, res, next) => {
        await user_service_1.userService.permanentDeleteUser(Number(req.params.id));
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "User permanently deleted" });
    },
    restore: async (req, res, next) => {
        await user_service_1.userService.restoreUser(Number(req.params.id));
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "User restored" });
    },
    verifyEmail: async (req, res, next) => {
        const result = await user_service_1.userService.verifyEmail(req.query.token);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    forgotPassword: async (req, res, next) => {
        const result = await user_service_1.userService.forgotPassword(req.body.email);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    resetPassword: async (req, res, next) => {
        const result = await user_service_1.userService.resetPassword(req.query.token, req.body.password);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    resendVerification: async (req, res, next) => {
        const result = await user_service_1.userService.resendVerificationEmail(req.body.email);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    search: async (req, res, next) => {
        const query = req.query.query;
        const users = await user_service_1.userService.searchUsers(query);
        return res.status(http_status_codes_1.StatusCodes.OK).json(users);
    }
};
exports.default = exports.UserController;
//# sourceMappingURL=user.controller.js.map