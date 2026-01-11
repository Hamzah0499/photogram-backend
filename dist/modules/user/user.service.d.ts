import { MySqlRawQueryResult } from "drizzle-orm/mysql2";
import { createUserDtoType, updateUserDtoType } from "../../db/schemas/user.schema";
export declare const userService: {
    createUser: (data: createUserDtoType) => Promise<{
        newUser: any;
        accessToken: string;
        refreshToken: string;
    }>;
    loginUser: ({ email, username, password }: {
        email?: string;
        username?: string;
        password: string;
    }) => Promise<{
        user: {
            id: number;
            name: string | null;
            username: string | null;
            email: string | null;
            avatar: string | null;
            role: "creator" | "consumer";
            type: "digital creator" | "musician" | "gamer" | "youtuber" | "member";
            bio: string | null;
            dateOfBirth: Date | null;
            gender: "male" | "female" | "other";
            phone: string | null;
            isVerified: boolean;
            isBlocked: boolean;
            isActive: true;
            createdAt: Date | null;
            updatedAt: Date | null;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refreshUser: (refreshToken: string) => Promise<{
        user: {
            id: number;
            name: string | null;
            username: string | null;
            email: string | null;
            avatar: string | null;
            role: "creator" | "consumer";
            type: "digital creator" | "musician" | "gamer" | "youtuber" | "member";
            bio: string | null;
            dateOfBirth: Date | null;
            gender: "male" | "female" | "other";
            phone: string | null;
            isVerified: boolean;
            isBlocked: boolean;
            isActive: true;
            createdAt: Date | null;
            updatedAt: Date | null;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    updateUser: (userId: number, updates: updateUserDtoType) => Promise<{
        id: number;
        name: string | null;
        username: string | null;
        email: string | null;
        avatar: string | null;
        role: "creator" | "consumer";
        type: "digital creator" | "musician" | "gamer" | "youtuber" | "member";
        bio: string | null;
        dateOfBirth: Date | null;
        gender: "male" | "female" | "other";
        phone: string | null;
        isVerified: boolean;
        isBlocked: boolean;
        isActive: true;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    uploadAvatar: (userId: number, file: Express.Multer.File | undefined) => Promise<{
        message: string;
        imageUrl: any;
        blobUrl: any;
    }>;
    getUserById: (userId: number) => Promise<{
        id: number;
        name: string | null;
        username: string | null;
        email: string | null;
        avatar: string | null;
        role: "creator" | "consumer";
        type: "digital creator" | "musician" | "gamer" | "youtuber" | "member";
        bio: string | null;
        dateOfBirth: Date | null;
        gender: "male" | "female" | "other";
        phone: string | null;
        isVerified: boolean;
        isBlocked: boolean;
        isActive: true;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    getUserByUsername: (username: string) => Promise<{
        id: number;
        name: string | null;
        username: string | null;
        email: string | null;
        avatar: string | null;
        role: "creator" | "consumer";
        type: "digital creator" | "musician" | "gamer" | "youtuber" | "member";
        bio: string | null;
        dateOfBirth: Date | null;
        gender: "male" | "female" | "other";
        phone: string | null;
        isVerified: boolean;
        isBlocked: boolean;
        isActive: true;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    softDeleteUser: (userId: number) => Promise<MySqlRawQueryResult>;
    permanentDeleteUser: (userId: number) => Promise<MySqlRawQueryResult>;
    restoreUser: (userId: number) => Promise<MySqlRawQueryResult>;
    verifyEmail: (token: string) => Promise<{
        message: string;
    }>;
    forgotPassword: (email: string) => Promise<{
        message: string;
    }>;
    resetPassword: (token: string, newPassword: string) => Promise<{
        message: string;
    }>;
    resendVerificationEmail: (email: string) => Promise<{
        message: string;
    }>;
    searchUsers: (query: string) => Promise<{
        id: number;
        name: string | null;
        username: string | null;
        email: string | null;
        avatar: string | null;
        role: "creator" | "consumer";
        type: "digital creator" | "musician" | "gamer" | "youtuber" | "member";
        bio: string | null;
        dateOfBirth: Date | null;
        gender: "male" | "female" | "other";
        phone: string | null;
        isVerified: boolean;
        isBlocked: boolean;
        isActive: true;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
};
//# sourceMappingURL=user.service.d.ts.map