import { createReactionDtoType } from "../../../db/schemas/reaction.schema";
export declare const reactionRepository: {
    insert: (reaction: createReactionDtoType) => Promise<number>;
    delete: (userId: number, postId: number) => Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    selectByPostId: (postId: number) => Promise<{
        id: number;
        postId: number | null;
        userId: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    isReacted: (userId: number, postId: number) => Promise<boolean>;
};
//# sourceMappingURL=reaction.repository.d.ts.map