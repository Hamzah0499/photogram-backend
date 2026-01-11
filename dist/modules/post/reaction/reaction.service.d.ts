export declare const reactionService: {
    toggleLike: (userId: number, postId: number) => Promise<{
        message: string;
    }>;
    getPostLikes: (postId: number) => Promise<{
        id: number;
        postId: number | null;
        userId: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
};
//# sourceMappingURL=reaction.service.d.ts.map