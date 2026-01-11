export declare const followerRepository: {
    insert: (userId: number, followerId: number) => Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    delete: (userId: number, followerId: number) => Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    getFollowers: (userId: number) => Promise<{
        id: number;
        userId: number | null;
        followerId: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    getFollowing: (userId: number) => Promise<{
        id: number;
        userId: number | null;
        followerId: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    isFollowing: (userId: number, followedId: number) => Promise<boolean>;
};
//# sourceMappingURL=follower.repository.d.ts.map