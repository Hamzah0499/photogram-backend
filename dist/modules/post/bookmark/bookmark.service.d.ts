export declare const bookmarkService: {
    toggleBookmark: (userId: number, postId: number) => Promise<{
        message: string;
        bookmarked: boolean;
    }>;
    getMyBookmarks: (userId: number) => Promise<{
        bookmarkId: number;
        postId: number;
        caption: string | null;
        location: string | null;
        createdAt: Date | null;
        creatorId: number | null;
    }[]>;
    getBookmarkCount: (postId: number) => Promise<number>;
};
//# sourceMappingURL=bookmark.service.d.ts.map