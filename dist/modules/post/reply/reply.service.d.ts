export declare const replyService: {
    addReply: (userId: number, commentId: number, text: string) => Promise<{
        id: number;
        commentId: number | null;
        userId: number | null;
        text: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    getCommentReplies: (commentId: number) => Promise<{
        id: number;
        commentId: number | null;
        userId: number | null;
        text: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    deleteReply: (userId: number, replyId: number) => Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
};
//# sourceMappingURL=reply.service.d.ts.map