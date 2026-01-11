import { MySqlRawQueryResult } from "drizzle-orm/mysql2";
import { createUserDtoType, selectUserDtoType, updateUserDtoType } from "../../db/schemas/user.schema";
import JWTService from "../../services/JWT.service";
import { userRepository } from "./user.repository";
import bcrypt from "bcrypt";
import { AppError } from "../../types/AppError";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { sendMail } from "../../utils/emailTransporter";
import { userDTO } from "../../dto/user.dto";
import { cloudStorage } from "../../utils/cloudStorage";

export const userService = {
    createUser: async (data: createUserDtoType): Promise<{ newUser: any, accessToken: string, refreshToken: string }> => {
        // Hash the password
        const hashedPassword = await bcrypt.hash(
            data.password || "",
            Number(process.env.BCRYPT_SALT_ROUNDS) || 10
        );

        const newUserResult = await userRepository.INSERT({
            ...data,
            password: hashedPassword,
        });

        const userId = newUserResult;

        const newUser = await userRepository.SELECT_BY_ID(userId);

        // Send Verification email
        try {
            const verificationToken = JWTService.signAccountVerificationToken({ userId });
            const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

            await sendMail({
                to: data.email!,
                subject: "Verify your Photogram account",
                template: "user/welcome", // Reusing welcome for now or I can create a verification template
                data: {
                    name: data.name,
                    username: data.username,
                    verificationLink,
                    frontend: process.env.FRONTEND_URL,
                },
            });
        } catch (error) {
            console.error("Failed to send verification email:", error);
        }

        // Generate JWT tokens
        const accessToken = JWTService.signAccessToken({
            userId,
            name: data.name,
            username: data.username,
            email: data.email,
            role: data.role || "consumer",
        });
        const refreshToken = JWTService.signRefreshToken({
            userId,
            name: data.name,
            username: data.username,
            email: data.email,
            role: data.role || "consumer",
        });

        return {
            newUser: userDTO(newUser), accessToken, refreshToken
        };
    },

    loginUser: async ({ email, username, password }: { email?: string, username?: string, password: string }) => {
        let user;
        if (email) {
            user = await userRepository.SELECT_BY_EMAIL(email);
        } else if (username) {
            user = await userRepository.SELECT_BY_USERNAME(username);
        }

        if (!user) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "User not found!"
            });
        }

        if (user.isBlocked) {
            throw new AppError({
                httpCode: StatusCodes.FORBIDDEN,
                name: getReasonPhrase(StatusCodes.FORBIDDEN),
                description: "Your account has been blocked!"
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password || "");

        if (!isPasswordValid) {
            throw new AppError({
                httpCode: StatusCodes.UNAUTHORIZED,
                name: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                description: "Invalid credentials!"
            });
        }

        if (!user.isVerified) {
            throw new AppError({
                httpCode: StatusCodes.UNAUTHORIZED,
                name: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                description: "Please verify your email before logging in."
            });
        }

        const accessToken = JWTService.signAccessToken({
            userId: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
        });
        const refreshToken = JWTService.signRefreshToken({
            userId: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
        });


        // Optional: Send Welcome email
        try {
            await sendMail({
                to: user.email!,
                subject: "Welcome to Photogram",
                template: "user/welcome",
                data: {
                    name: user.name,
                    username: user.username,
                    frontend: process.env.FRONTEND_URL,
                },
            });
        } catch (error) {
            console.error("Failed to send welcome email:", error);
        }

        return { user: userDTO(user), accessToken, refreshToken };
    },

    refreshUser: async (refreshToken: string) => {
        if (!refreshToken) {
            throw new AppError({
                httpCode: StatusCodes.BAD_REQUEST,
                name: getReasonPhrase(StatusCodes.BAD_REQUEST),
                description: "No refresh token provided!"
            });
        }

        const payload = JWTService.verifyRefreshToken(refreshToken);
        if (!payload) {
            throw new AppError({
                httpCode: StatusCodes.UNAUTHORIZED,
                name: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                description: "Invalid refresh token"
            });
        }

        const user = await userRepository.SELECT_BY_ID(payload.userId);
        if (!user) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "User not found"
            });
        }

        const accessToken = JWTService.signAccessToken({
            userId: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
        });
        const newRefreshToken = JWTService.signRefreshToken({
            userId: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
        });

        return { user: userDTO(user), accessToken, refreshToken: newRefreshToken };
    },

    updateUser: async (userId: number, updates: updateUserDtoType) => {
        // Remove sensitive fields from updates if they somehow got in
        const { password, email, username, id, ...safeUpdates } = updates as any;

        const result = await userRepository.UPDATE_BY_ID(userId, safeUpdates);

        if (!result) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "User not found!",
            });
        }

        return userDTO(await userRepository.SELECT_BY_ID(userId));
    },

    uploadAvatar: async (userId: number, file: Express.Multer.File | undefined) => {
        if (!file) {
            throw new AppError({
                httpCode: StatusCodes.BAD_REQUEST,
                name: getReasonPhrase(StatusCodes.BAD_REQUEST),
                description: 'No file uploaded!'
            })
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

        const cloudFile = await cloudStorage.uploadMedia(file, "avatars");
        const avatarUrl = cloudFile.blobUrl;

        await userRepository.UPDATE_BY_ID(userId, { avatar: avatarUrl });

        return {
            message: "Avatar uploaded successfully",
            imageUrl: avatarUrl,
            blobUrl: cloudFile.blobUrl
        };
    },


    getUserById: async (userId: number) => {
        const user = await userRepository.SELECT_BY_ID(userId);
        if (!user) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "User not found!",
            });
        }
        return userDTO(user);
    },

    getUserByUsername: async (username: string) => {
        const user = await userRepository.SELECT_BY_USERNAME(username);
        if (!user) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "User not found!",
            });
        }
        return userDTO(user);
    },

    softDeleteUser: async (userId: number) => {
        return await userRepository.SOFT_DELETE_BY_ID(userId);
    },

    permanentDeleteUser: async (userId: number) => {
        return await userRepository.PERMANENT_DELETE_BY_ID(userId);
    },

    restoreUser: async (userId: number) => {
        return await userRepository.RESTORE_BY_ID(userId);
    },

    verifyEmail: async (token: string) => {
        const payload = JWTService.verifyAccountVerificationToken(token);
        if (!payload) {
            throw new AppError({
                httpCode: StatusCodes.UNAUTHORIZED,
                name: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                description: "Invalid or expired verification token"
            });
        }

        const user = await userRepository.SELECT_BY_ID(payload.userId);
        if (!user) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "User not found"
            });
        }

        if (user.isVerified) {
            return { message: "Account is already verified" };
        }

        await userRepository.UPDATE_BY_ID(user.id, { isVerified: true });

        return { message: "Account verified successfully" };
    },

    forgotPassword: async (email: string) => {
        const user = await userRepository.SELECT_BY_EMAIL(email);
        if (!user) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "User with this email does not exist"
            });
        }

        const resetToken = JWTService.signResetToken({ userId: user.id });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        await sendMail({
            to: user.email!,
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

    resetPassword: async (token: string, newPassword: string) => {
        const payload = JWTService.verifyResetToken(token);
        if (!payload) {
            throw new AppError({
                httpCode: StatusCodes.UNAUTHORIZED,
                name: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                description: "Invalid or expired reset token"
            });
        }

        const user = await userRepository.SELECT_BY_ID(payload.userId);
        if (!user) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "User not found"
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            Number(process.env.BCRYPT_SALT_ROUNDS) || 10
        );

        await userRepository.UPDATE_BY_ID(user.id, { password: hashedPassword });

        // Notify user about password change
        try {
            await sendMail({
                to: user.email!,
                subject: "Password Changed Successfully",
                template: "user/password-reseted",
                data: {
                    name: user.name,
                    frontend: process.env.FRONTEND_URL,
                },
            });
        } catch (error) {
            console.error("Failed to send password reset confirmation email:", error);
        }

        return { message: "Password has been reset successfully" };
    },

    resendVerificationEmail: async (email: string) => {
        const user = await userRepository.SELECT_BY_EMAIL(email);
        if (!user) {
            throw new AppError({
                httpCode: StatusCodes.NOT_FOUND,
                name: getReasonPhrase(StatusCodes.NOT_FOUND),
                description: "User with this email does not exist"
            });
        }

        if (user.isVerified) {
            return { message: "Account is already verified" };
        }

        try {
            const verificationToken = JWTService.signAccountVerificationToken({ userId: user.id });
            const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

            await sendMail({
                to: user.email!,
                subject: "Verify your Photogram account",
                template: "user/welcome",
                data: {
                    name: user.name,
                    username: user.username,
                    verificationLink,
                    frontend: process.env.FRONTEND_URL,
                },
            });
        } catch (error) {
            console.error("Failed to send verification email:", error);
            throw new AppError({
                httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
                name: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                description: "Failed to send verification email. Please try again later."
            });
        }

        return { message: "Verification email resent successfully" };
    },

    searchUsers: async (query: string) => {
        const users = await userRepository.SEARCH(query);
        return users.map(user => userDTO(user));
    }
};
