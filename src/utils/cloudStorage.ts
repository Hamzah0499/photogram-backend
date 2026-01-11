import { BlobServiceClient } from "@azure/storage-blob";
import { AppError } from "../types/AppError";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import fs from "fs";
import path from "path";
import { processImage } from "./mediaProcessor";

// In your current code, you set isProduction = (env === "development"). 
// Usually, it should be (env === "production"). 
// I will stick to what you have or make it clearer.
const isDev = process.env.NODE_ENV === "development";

let containerClient: any;

// Initialize Azure Blob Storage if not in dev mode (or if you want to use it in dev too)
if (!isDev) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURITE_STORAGE_CONNECTION_STRING as string
    );
    containerClient = blobServiceClient.getContainerClient(
        process.env.AZURE_STORAGE_CONTAINER_NAME as string
    );
}

export const cloudStorage = {
    /**
     * Uploads media. 
     * In development: Saves to local 'uploads' folder.
     * In production: Uploads to Azure Blob Storage.
     * Features: Resizing and Watermarking for images.
     */
    uploadMedia: async (file: Express.Multer.File, folder: string = "posts", watermarkText?: string) => {
        try {
            let finalBuffer = file.buffer;
            let finalMimetype = file.mimetype;

            // Apply image processing (Resize & Watermark) if it's an image
            if (file.mimetype.startsWith("image/")) {
                finalBuffer = await processImage(file.buffer, watermarkText);
                finalMimetype = "image/webp"; // processImage converts to webp
            }

            if (isDev) {
                // Development: Local Storage
                const uploadDir = path.join(process.cwd(), "uploads", folder);
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }

                const extension = finalMimetype.split("/")[1];
                const fileName = `${Date.now()}-${file.originalname.replace(/\..+$/, "").replace(/\s+/g, '_')}.${extension}`;
                const filePath = path.join(uploadDir, fileName);

                fs.writeFileSync(filePath, finalBuffer);

                const localUrl = `${process.env.BACKEND_URL}/uploads/${folder}/${fileName}`;

                return {
                    blobUrl: localUrl,
                    mimetype: finalMimetype,
                    size: finalBuffer.length,
                    originalBuffer: finalBuffer // useful for AI analysis
                };
            }

            // Production: Azure Blob Storage
            const extension = finalMimetype.split("/")[1];
            const blobName = `${folder}/${Date.now()}-${file.originalname.replace(/\..+$/, "").replace(/\s+/g, '_')}.${extension}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            // Upload to Azure
            await blockBlobClient.uploadData(finalBuffer, {
                blobHTTPHeaders: { blobContentType: finalMimetype },
            });

            return {
                blobUrl: blockBlobClient.url,
                mimetype: finalMimetype,
                size: finalBuffer.length,
                originalBuffer: finalBuffer
            };
        } catch (error: any) {
            console.error("Upload error:", error);
            throw new AppError({
                httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
                name: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                description: `Failed to upload media. ${!isDev ? "Check Azure credentials." : "Check local permissions."}`,
            });
        }
    },

    /**
     * Deletes media.
     * In development: Deletes from local 'uploads' folder.
     * In production: Deletes from Azure.
     */
    deleteMedia: async (blobPath: string) => {
        try {
            if (isDev) {
                const relativePath = blobPath.replace(`${process.env.BACKEND_URL}/uploads/`, "");
                const filePath = path.join(process.cwd(), "uploads", relativePath);

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                return;
            }

            // Production: Delete from Azure
            const blockBlobClient = containerClient.getBlockBlobClient(new URL(blobPath).pathname.split('/').slice(2).join('/'));
            await blockBlobClient.deleteIfExists();
        } catch (error) {
            console.error("Delete error:", error);
        }
    }
};
