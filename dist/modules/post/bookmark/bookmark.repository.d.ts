import { createBookmarkDtoType } from "../../../db/schemas/bookmark.schema";
export declare const bookmarkRepository: {
    insert: (data: createBookmarkDtoType) => Promise<number>;
    delete: (userId: number, postId: number) => Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    selectOne: (userId: number, postId: number) => Promise<{
        id: number;
        userId: number;
        postId: number;
        createdAt: Date | null;
    }>;
    selectUserBookmarks: (userId: number) => Promise<{
        bookmarkId: number;
        postId: number;
        caption: string | null;
        location: string | null;
        createdAt: Date | null;
        creatorId: number | null;
    }[]>;
    countByPostId: (postId: number) => Promise<number>;
};
//# sourceMappingURL=bookmark.repository.d.ts.map