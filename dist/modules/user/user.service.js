"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const JWT_service_1 = __importDefault(require("../../services/JWT.service"));
const user_repository_1 = require("./user.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = require("../../types/AppError");
const http_status_codes_1 = require("http-status-codes");
const emailTransporter_1 = require("../../utils/emailTransporter");
const user_dto_1 = require("../../dto/user.dto");
const cloudStorage_1 = require("../../utils/cloudStorage");
exports.userService = {
    createUser: async (data) => {
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(data.password || "", Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
        const newUserResult = await user_repository_1.userRepository.INSERT({
            ...data,
            password: hashedPassword,
        });
        const userId = newUserResult;
        const newUser = await user_repository_1.userRepository.SELECT_BY_ID(userId);
        // Send Verification email
        try {
            const verificationToken = JWT_service_1.default.signAccountVerificationToken({ userId });
            const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
            await (0, emailTransporter_1.sendMail)({
                to: data.email,
                subject: "Verify your Photogram account",
                template: "user/welcome", // Reusing welcome for now or I can create a verification template
                data: {
                    name: data.name,
                    username: data.username,
                    verificationLink,
                    frontend: process.env.FRONTEND_URL,
                },
            });
        }
        catch (error) {
            console.error("Failed to send verification email:", error);
        }
        // Generate JWT tokens
        const accessToken = JWT_service_1.default.signAccessToken({
            userId,
            name: data.name,
            username: data.username,
            email: data.email,
            role: data.role || "consumer",
        });
        const refreshToken = JWT_service_1.default.signRefreshToken({
            userId,
            name: data.name,
            username: data.username,
            email: data.email,
            role: data.role || "consumer",
        });
        return {
            newUser: (0, user_dto_1.userDTO)(newUser), accessToken, refreshToken
        };
    },
    loginUser: async ({ email, username, password }) => {
        let user;
        if (email) {
            user = await user_repository_1.userRepository.SELECT_BY_EMAIL(email);
        }
        else if (username) {
            user = await user_repository_1.userRepository.SELECT_BY_USERNAME(username);
        }
        if (!user) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "User not found!"
            });
        }
        if (user.isBlocked) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.FORBIDDEN,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.FORBIDDEN),
                description: "Your account has been blocked!"
            });
        }
        const isPasswordValid = bcrypt_1.default.compareSync(password, user.password || "");
        if (!isPasswordValid) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.UNAUTHORIZED),
                description: "Invalid credentials!"
            });
        }
        if (!user.isVerified) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.UNAUTHORIZED),
                description: "Please verify your email before logging in."
            });
        }
        const accessToken = JWT_service_1.default.signAccessToken({
            userId: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
        });
        const refreshToken = JWT_service_1.default.signRefreshToken({
            userId: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
        });
        // Optional: Send Welcome email
        try {
            await (0, emailTransporter_1.sendMail)({
                to: user.email,
                subject: "Welcome to Photogram",
                template: "user/welcome",
                data: {
                    name: user.name,
                    username: user.username,
                    frontend: process.env.FRONTEND_URL,
                },
            });
        }
        catch (error) {
            console.error("Failed to send welcome email:", error);
        }
        return { user: (0, user_dto_1.userDTO)(user), accessToken, refreshToken };
    },
    refreshUser: async (refreshToken) => {
        if (!refreshToken) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_REQUEST),
                description: "No refresh token provided!"
            });
        }
        const payload = JWT_service_1.default.verifyRefreshToken(refreshToken);
        if (!payload) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.UNAUTHORIZED),
                description: "Invalid refresh token"
            });
        }
        const user = await user_repository_1.userRepository.SELECT_BY_ID(payload.userId);
        if (!user) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "User not found"
            });
        }
        const accessToken = JWT_service_1.default.signAccessToken({
            userId: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
        });
        const newRefreshToken = JWT_service_1.default.signRefreshToken({
            userId: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
        });
        return { user: (0, user_dto_1.userDTO)(user), accessToken, refreshToken: newRefreshToken };
    },
    updateUser: async (userId, updates) => {
        // Remove sensitive fields from updates if they somehow got in
        const { password, email, username, id, ...safeUpdates } = updates;
        const result = await user_repository_1.userRepository.UPDATE_BY_ID(userId, safeUpdates);
        if (!result) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "User not found!",
            });
        }
        return (0, user_dto_1.userDTO)(await user_repository_1.userRepository.SELECT_BY_ID(userId));
    },
    uploadAvatar: async (userId, file) => {
        if (!file) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_REQUEST),
                description: 'No file uploaded!'
            });
        }
        // const uploadDir = "uploads/avatars/";
        // ensureUploadDir(uploadDir);
        // const filename = generateImageName("avatar");
        // await processAndSaveImage(
        //     file.buffer,
        //     uploadDir,
        //     filename,
        //     {
        //         width: 300,
        //         height: 300,
        //         quality: 80,
        //         format: "webp",
        //     }
        // );
        // const avatarUrl = `${process.env.BACKEND_URL}/uploads/avatars/${filename}`;
        const cloudFile = await cloudStorage_1.cloudStorage.uploadMedia(file, "avatars");
        const avatarUrl = cloudFile.blobUrl;
        await user_repository_1.userRepository.UPDATE_BY_ID(userId, { avatar: avatarUrl });
        return {
            message: "Avatar uploaded successfully",
            imageUrl: avatarUrl,
            blobUrl: cloudFile.blobUrl
        };
    },
    getUserById: async (userId) => {
        const user = await user_repository_1.userRepository.SELECT_BY_ID(userId);
        if (!user) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "User not found!",
            });
        }
        return (0, user_dto_1.userDTO)(user);
    },
    getUserByUsername: async (username) => {
        const user = await user_repository_1.userRepository.SELECT_BY_USERNAME(username);
        if (!user) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "User not found!",
            });
        }
        return (0, user_dto_1.userDTO)(user);
    },
    softDeleteUser: async (userId) => {
        return await user_repository_1.userRepository.SOFT_DELETE_BY_ID(userId);
    },
    permanentDeleteUser: async (userId) => {
        return await user_repository_1.userRepository.PERMANENT_DELETE_BY_ID(userId);
    },
    restoreUser: async (userId) => {
        return await user_repository_1.userRepository.RESTORE_BY_ID(userId);
    },
    verifyEmail: async (token) => {
        const payload = JWT_service_1.default.verifyAccountVerificationToken(token);
        if (!payload) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.UNAUTHORIZED),
                description: "Invalid or expired verification token"
            });
        }
        const user = await user_repository_1.userRepository.SELECT_BY_ID(payload.userId);
        if (!user) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "User not found"
            });
        }
        if (user.isVerified) {
            return { message: "Account is already verified" };
        }
        await user_repository_1.userRepository.UPDATE_BY_ID(user.id, { isVerified: true });
        return { message: "Account verified successfully" };
    },
    forgotPassword: async (email) => {
        const user = await user_repository_1.userRepository.SELECT_BY_EMAIL(email);
        if (!user) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "User with this email does not exist"
            });
        }
        const resetToken = JWT_service_1.default.signResetToken({ userId: user.id });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        await (0, emailTransporter_1.sendMail)({
            to: user.email,
            subject: "Password Reset Request",
            template: "user/reset-password-link",
            data: {
                name: user.name,
                resetLink,
                frontend: process.env.FRONTEND_URL,
            },
        });
        return { message: "Password reset link sent to your email" };
    },
    resetPassword: async (token, newPassword) => {
        const payload = JWT_service_1.default.verifyResetToken(token);
        if (!payload) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.UNAUTHORIZED),
                description: "Invalid or expired reset token"
            });
        }
        const user = await user_repository_1.userRepository.SELECT_BY_ID(payload.userId);
        if (!user) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "User not found"
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
        await user_repository_1.userRepository.UPDATE_BY_ID(user.id, { password: hashedPassword });
        // Notify user about password change
        try {
            await (0, emailTransporter_1.sendMail)({
                to: user.email,
                subject: "Password Changed Successfully",
                template: "user/password-reseted",
                data: {
                    name: user.name,
                    frontend: process.env.FRONTEND_URL,
                },
            });
        }
        catch (error) {
            console.error("Failed to send password reset confirmation email:", error);
        }
        return { message: "Password has been reset successfully" };
    },
    resendVerificationEmail: async (email) => {
        const user = await user_repository_1.userRepository.SELECT_BY_EMAIL(email);
        if (!user) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
                description: "User with this email does not exist"
            });
        }
        if (user.isVerified) {
            return { message: "Account is already verified" };
        }
        try {
            const verificationToken = JWT_service_1.default.signAccountVerificationToken({ userId: user.id });
            const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
            await (0, emailTransporter_1.sendMail)({
                to: user.email,
                subject: "Verify your Photogram account",
                template: "user/welcome",
                data: {
                    name: user.name,
                    username: user.username,
                    verificationLink,
                    frontend: process.env.FRONTEND_URL,
                },
            });
        }
        catch (error) {
            console.error("Failed to send verification email:", error);
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
                description: "Failed to send verification email. Please try again later."
            });
        }
        return { message: "Verification email resent successfully" };
    },
    searchUsers: async (query) => {
        const users = await user_repository_1.userRepository.SEARCH(query);
        return users.map(user => (0, user_dto_1.userDTO)(user));
    }
};
//# sourceMappingURL=user.service.js.map