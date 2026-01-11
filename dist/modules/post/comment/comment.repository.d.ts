import { createCommentDtoType } from "../../../db/schemas/comment.schema";
export declare const commentRepository: {
    insert: (comment: createCommentDtoType) => Promise<number>;
    selectByPostId: (postId: number) => Promise<{
        user: {
            id: number;
            name: string | null;
            username: string | null;
            email: string | null;
            password: string | null;
            avatar: string | null;
            role: "creator" | "consumer";
            type: "digital creator" | "musician" | "gamer" | "youtuber" | "member";
            bio: string | null;
            dateOfBirth: Date | null;
            gender: "male" | "female" | "other";
            phone: string | null;
            isVerified: boolean;
            isBlocked: boolean;
            isActive: boolean;
            createdAt: Date | null;
            updatedAt: Date | null;
            deletedAt: Date | null;
        } | null;
        replies: any;
        id: number;
        postId: number | null;
        userId: number | null;
        text: string;
        sentiment: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    deleteById: (id: number) => Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    selectById: (id: number) => Promise<{
        id: number;
        postId: number | null;
        userId: number | null;
        text: string;
        sentiment: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
};
//# sourceMappingURL=comment.repository.d.ts.map