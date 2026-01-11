export declare const followingRepository: {
    insert: (userId: number, followingId: number) => Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    delete: (userId: number, followingId: number) => Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    getFollowing: (userId: number) => Promise<{
        id: number;
        userId: number | null;
        followingId: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    getFollowers: (userId: number) => Promise<{
        id: number;
        userId: number | null;
        followingId: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    isFollowing: (userId: number, followedId: number) => Promise<boolean>;
};
//# sourceMappingURL=following.repository.d.ts.map