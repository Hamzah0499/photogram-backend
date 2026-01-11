import { createReplyDtoType } from "../../../db/schemas/reply.schema";
export declare const replyRepository: {
    insert: (reply: createReplyDtoType) => Promise<number>;
    selectByCommentId: (commentId: number) => Promise<{
        id: number;
        commentId: number | null;
        userId: number | null;
        text: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    deleteById: (id: number) => Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    selectById: (id: number) => Promise<{
        id: number;
        commentId: number | null;
        userId: number | null;
        text: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
};
//# sourceMappingURL=reply.repository.d.ts.map