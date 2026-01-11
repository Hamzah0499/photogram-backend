export declare const commentService: {
    addComment: (userId: number, postId: number, text: string) => Promise<{
        message: string;
    }>;
    getPostComments: (postId: number) => Promise<{
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
    deleteComment: (userId: number, commentId: number) => Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
};
//# sourceMappingURL=comment.service.d.ts.map