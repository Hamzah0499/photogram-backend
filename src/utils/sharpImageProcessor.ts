import fs from "fs";
import path from "path";
import sharp from "sharp";

/**
 * Ensure upload directory exists
 */
export const ensureUploadDir = (dir: string): void => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

/**
 * Generate unique image filename
 */
export const generateImageName = (
    prefix: string = "image",
    ext: string = "webp"
): string => {
    return `${prefix}-${Date.now()}-${Math.round(
        Math.random() * 1e9
    )}.${ext}`;
};

/**
 * Process image using Sharp
 */
interface ProcessImageOptions {
    width?: number;
    height?: number;
    quality?: number;
    format?: "jpeg" | "png" | "webp";
}

export const processAndSaveImage = async (
    buffer: Buffer,
    uploadDir: string,
    filename: string,
    options: ProcessImageOptions = {}
): Promise<void> => {
    const {
        width = 300,
        height = 300,
        quality = 80,
        format = "webp",
    } = options;

    const outputPath = path.join(uploadDir, filename);

    let image = sharp(buffer).resize(width, height);

    if (format === "jpeg") {
        image = image.jpeg({ quality });
    } else if (format === "png") {
        image = image.png({ quality });
    } else {
        image = image.webp({ quality });
    }

    await image.toFile(outputPath);
};
