/**
 * Ensure upload directory exists
 */
export declare const ensureUploadDir: (dir: string) => void;
/**
 * Generate unique image filename
 */
export declare const generateImageName: (prefix?: string, ext?: string) => string;
/**
 * Process image using Sharp
 */
interface ProcessImageOptions {
    width?: number;
    height?: number;
    quality?: number;
    format?: "jpeg" | "png" | "webp";
}
export declare const processAndSaveImage: (buffer: Buffer, uploadDir: string, filename: string, options?: ProcessImageOptions) => Promise<void>;
export {};
//# sourceMappingURL=sharpImageProcessor.d.ts.map