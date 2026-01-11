import { createMediaDtoType } from "../../db/schemas/media.schema";
export declare const mediaRepository: {
    insert: (media: createMediaDtoType) => Promise<number>;
    selectByPostId: (postId: number) => Promise<{
        id: number;
        postId: number | null;
        title: string | null;
        type: string | null;
        blobUrl: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    deleteById: (id: number) => Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
};
//# sourceMappingURL=media.repository.d.ts.map