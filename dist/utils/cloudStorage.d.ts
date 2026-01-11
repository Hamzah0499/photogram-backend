export declare const cloudStorage: {
    /**
     * Uploads media.
     * In development: Saves to local 'uploads' folder.
     * In production: Uploads to Azure Blob Storage.
     * Features: Resizing and Watermarking for images.
     */
    uploadMedia: (file: Express.Multer.File, folder?: string, watermarkText?: string) => Promise<{
        blobUrl: any;
        mimetype: string;
        size: number;
        originalBuffer: Buffer<ArrayBufferLike>;
    }>;
    /**
     * Deletes media.
     * In development: Deletes from local 'uploads' folder.
     * In production: Deletes from Azure.
     */
    deleteMedia: (blobPath: string) => Promise<void>;
};
//# sourceMappingURL=cloudStorage.d.ts.map