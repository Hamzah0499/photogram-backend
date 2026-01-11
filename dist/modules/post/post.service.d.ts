export declare const postService: {
    createPost: (creatorId: number, data: any, files: Express.Multer.File[]) => Promise<{
        media: {
            id: number;
            blobUrl: any;
        }[];
        id: number;
        creatorId: number | null;
        caption: string | null;
        location: string | null;
        people: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    getAllPosts: () => Promise<{
        creator: {
            id: number;
            name: string | null;
            username: string | null;
            email: string | null;
            password: string | null;
            avatar: string | null;
            role: "creator" | "consumer";
            type: "digital creator" | "musician" | "gamer" | "youtuber" | "member";
            bio: string | null;
            dateOfBirth: Date | null;
            gender: "male" | "female" | "other";
            phone: string | null;
            isVerified: boolean;
            isBlocked: boolean;
            isActive: boolean;
            createdAt: Date | null;
            updatedAt: Date | null;
            deletedAt: Date | null;
        } | null;
        media: string[];
        likedUsers: {
            id: number;
            postId: number | null;
            userId: number | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        } | null;
        likesCount: number;
        bookmarkedUsers: {
            id: number;
            userId: number;
            postId: number;
            createdAt: Date | null;
        } | null;
        id: number;
        creatorId: number | null;
        caption: string | null;
        location: string | null;
        people: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    getPostById: (postId: number) => Promise<{
        media: {
            id: number;
            postId: number | null;
            title: string | null;
            type: string | null;
            blobUrl: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        }[];
        id: number;
        creatorId: number | null;
        caption: string | null;
        location: string | null;
        people: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    deletePost: (userId: number, postId: number) => Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    getPostsByUsername: (username: string) => Promise<{
        creator: {
            id: number;
            name: string | null;
            username: string | null;
            email: string | null;
            password: string | null;
            avatar: string | null;
            role: "creator" | "consumer";
            type: "digital creator" | "musician" | "gamer" | "youtuber" | "member";
            bio: string | null;
            dateOfBirth: Date | null;
            gender: "male" | "female" | "other";
            phone: string | null;
            isVerified: boolean;
            isBlocked: boolean;
            isActive: boolean;
            createdAt: Date | null;
            updatedAt: Date | null;
            deletedAt: Date | null;
        };
        media: string[];
        id: number;
        creatorId: number | null;
        caption: string | null;
        location: string | null;
        people: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    searchPosts: (query: string) => Promise<{
        creator: {
            id: number;
            name: string | null;
            username: string | null;
            email: string | null;
            password: string | null;
            avatar: string | null;
            role: "creator" | "consumer";
            type: "digital creator" | "musician" | "gamer" | "youtuber" | "member";
            bio: string | null;
            dateOfBirth: Date | null;
            gender: "male" | "female" | "other";
            phone: string | null;
            isVerified: boolean;
            isBlocked: boolean;
            isActive: boolean;
            createdAt: Date | null;
            updatedAt: Date | null;
            deletedAt: Date | null;
        } | null;
        media: string[];
        id: number;
        creatorId: number | null;
        caption: string | null;
        location: string | null;
        people: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    getExplorePosts: () => Promise<{
        creator: {
            id: number;
            name: string | null;
            username: string | null;
            email: string | null;
            password: string | null;
            avatar: string | null;
            role: "creator" | "consumer";
            type: "digital creator" | "musician" | "gamer" | "youtuber" | "member";
            bio: string | null;
            dateOfBirth: Date | null;
            gender: "male" | "female" | "other";
            phone: string | null;
            isVerified: boolean;
            isBlocked: boolean;
            isActive: boolean;
            createdAt: Date | null;
            updatedAt: Date | null;
            deletedAt: Date | null;
        } | null;
        media: string[];
        id: number;
        creatorId: number | null;
        caption: string | null;
        location: string | null;
        people: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
};
//# sourceMappingURL=post.service.d.ts.map