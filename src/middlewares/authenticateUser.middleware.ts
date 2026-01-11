import { Request, Response, NextFunction } from "express";
import JWTService from "../services/JWT.service";
import { db } from "../db";
import { userSchema, selectUserDtoType } from "../db/schemas/user.schema";
import { eq } from "drizzle-orm";
import { AppError } from "../types/AppError";
import { StatusCodes } from "http-status-codes";
// import { KNOWN_ERROR_RESPONSES } from "../utils/knownErrorResponses";

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            user?: selectUserDtoType;
        }
    }
}

export const authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { accessToken, refreshToken } = req.cookies;

    // console.log("Cookies: ", req.cookies)

    try {
        if (!accessToken && !refreshToken) {
            throw new AppError({
                httpCode: StatusCodes.UNAUTHORIZED,
                name: "Unauthorized",
                description: "Authentication required!",
            })
        }

        let user: selectUserDtoType | null = null;

        // First, try to verify the access token
        if (accessToken) {
            try {
                const decoded = JWTService.verifyAccessToken(accessToken);
                const [foundUser] = await db
                    .select()
                    .from(userSchema)
                    .where(eq(userSchema.id, decoded.userId));
                user = foundUser || null;

                if (user) {
                    req.user = user;

                    console.log("\t:>>> Access token present")
                    // console.log("\t:>>> User: ", user)

                    return next();
                }
            } catch (error) {
                // Access token invalid/expired, continue to refresh token
            }
        }

        // If access token is invalid/expired or missing, try to refresh using the refresh token
        if (refreshToken) {
            try {
                const decodedRefresh = JWTService.verifyRefreshToken(refreshToken);
                const [foundUser] = await db
                    .select()
                    .from(userSchema)
                    .where(eq(userSchema.id, decodedRefresh.userId));
                user = foundUser || null;

                if (user) {
                    // Generate new access token since we're using refresh token
                    const newAccessToken = JWTService.signAccessToken({
                        userId: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                    });

                    // Set new access token cookie
                    res.cookie("accessToken", newAccessToken, {
                        httpOnly: true,
                        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 3600 * 1000, // 1 hour
                    });

                    req.user = user;


                    console.log("\t:>>> Refresh token present")

                    return next();
                }
            } catch (error) {
                // Refresh token also invalid
                throw new AppError({
                    httpCode: StatusCodes.UNAUTHORIZED,
                    name: "Unauthorized",
                    description: "Both authentication token are missing!",
                })
            }
        }

        if (!user) {
            // Clear invalid tokens
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            throw new AppError({
                httpCode: StatusCodes.UNAUTHORIZED,
                name: "Unauthorized",
                description: "User not found or session expired!",
            });
        }

        // If we reach here, no valid tokens were provided
        throw new AppError({
            httpCode: StatusCodes.UNAUTHORIZED,
            name: "Unauthorized",
            description: "Authentication required!",
        });
    } catch (error: any) {
        console.error(`[Auth Error] ${error.message}`);
        throw new AppError({
            httpCode: StatusCodes.UNAUTHORIZED,
            name: "Unauthorized",
            description: "Unauthorized access!",
        });
    }
};
