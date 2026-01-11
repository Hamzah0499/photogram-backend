import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../types/AppError";

const isProduction = process.env.NODE_ENV === "production";

export const UserController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        const { newUser, accessToken, refreshToken } = await userService.createUser(req.body);

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

        return res.status(StatusCodes.CREATED).json(newUser);
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        const { user, accessToken, refreshToken } = await userService.loginUser(req.body);

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

        return res.status(StatusCodes.OK).json(user);
    },

    logout: async (req: Request, res: Response, next: NextFunction) => {
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

        return res.status(StatusCodes.OK).json({ message: "Logout successful" });
    },

    refresh: async (req: Request, res: Response, next: NextFunction) => {
        const { user, accessToken, refreshToken } = await userService.refreshUser(req.cookies.refreshToken);

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

        return res.status(StatusCodes.OK).json(user);
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        const updatedUser = await userService.updateUser(Number(req.params.id), req.body);
        return res.status(StatusCodes.OK).json(updatedUser);
    },

    uploadAvatar: async (req: Request, res: Response, next: NextFunction) => {
        const result = await userService.uploadAvatar(Number(req.params.id), req.file);
        return res.status(StatusCodes.OK).json(result);
    },


    getById: async (req: Request, res: Response, next: NextFunction) => {
        const user = await userService.getUserById(Number(req.params.id));
        return res.status(StatusCodes.OK).json(user);
    },

    getByUsername: async (req: Request, res: Response, next: NextFunction) => {
        const user = await userService.getUserByUsername(req.params.username);
        return res.status(StatusCodes.OK).json(user);
    },

    softDelete: async (req: Request, res: Response, next: NextFunction) => {
        await userService.softDeleteUser(Number(req.params.id));
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(StatusCodes.OK).json({ message: "User soft deleted" });
    },

    permanentDelete: async (req: Request, res: Response, next: NextFunction) => {
        await userService.permanentDeleteUser(Number(req.params.id));
        return res.status(StatusCodes.OK).json({ message: "User permanently deleted" });
    },

    restore: async (req: Request, res: Response, next: NextFunction) => {
        await userService.restoreUser(Number(req.params.id));
        return res.status(StatusCodes.OK).json({ message: "User restored" });
    },

    verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
        const result = await userService.verifyEmail(req.query.token as string);
        return res.status(StatusCodes.OK).json(result);
    },

    forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
        const result = await userService.forgotPassword(req.body.email);
        return res.status(StatusCodes.OK).json(result);
    },

    resetPassword: async (req: Request, res: Response, next: NextFunction) => {
        const result = await userService.resetPassword(req.query.token as string, req.body.password);
        return res.status(StatusCodes.OK).json(result);
    },

    resendVerification: async (req: Request, res: Response, next: NextFunction) => {
        const result = await userService.resendVerificationEmail(req.body.email);
        return res.status(StatusCodes.OK).json(result);
    },

    search: async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query.query as string;
        const users = await userService.searchUsers(query);
        return res.status(StatusCodes.OK).json(users);
    }
};

export default UserController;
