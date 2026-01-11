export declare const followerService: {
    followUser: (userId: number, followId: number) => Promise<{
        message: string;
    }>;
    unfollowUser: (userId: number, unfollowId: number) => Promise<{
        message: string;
    }>;
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
        followingId: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
};
//# sourceMappingURL=follower.service.d.ts.map