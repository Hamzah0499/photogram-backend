"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudStorage = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const AppError_1 = require("../types/AppError");
const http_status_codes_1 = require("http-status-codes");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mediaProcessor_1 = require("./mediaProcessor");
// In your current code, you set isProduction = (env === "development"). 
// Usually, it should be (env === "production"). 
// I will stick to what you have or make it clearer.
const isDev = process.env.NODE_ENV === "development";
let containerClient;
// Initialize Azure Blob Storage if not in dev mode (or if you want to use it in dev too)
if (!isDev) {
    const blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(process.env.AZURITE_STORAGE_CONNECTION_STRING);
    containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);
}
exports.cloudStorage = {
    /**
     * Uploads media.
     * In development: Saves to local 'uploads' folder.
     * In production: Uploads to Azure Blob Storage.
     * Features: Resizing and Watermarking for images.
     */
    uploadMedia: async (file, folder = "posts", watermarkText) => {
        try {
            let finalBuffer = file.buffer;
            let finalMimetype = file.mimetype;
            // Apply image processing (Resize & Watermark) if it's an image
            if (file.mimetype.startsWith("image/")) {
                finalBuffer = await (0, mediaProcessor_1.processImage)(file.buffer, watermarkText);
                finalMimetype = "image/webp"; // processImage converts to webp
            }
            if (isDev) {
                // Development: Local Storage
                const uploadDir = path_1.default.join(process.cwd(), "uploads", folder);
                if (!fs_1.default.existsSync(uploadDir)) {
                    fs_1.default.mkdirSync(uploadDir, { recursive: true });
                }
                const extension = finalMimetype.split("/")[1];
                const fileName = `${Date.now()}-${file.originalname.replace(/\..+$/, "").replace(/\s+/g, '_')}.${extension}`;
                const filePath = path_1.default.join(uploadDir, fileName);
                fs_1.default.writeFileSync(filePath, finalBuffer);
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
        }
        catch (error) {
            console.error("Upload error:", error);
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                name: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
                description: `Failed to upload media. ${!isDev ? "Check Azure credentials." : "Check local permissions."}`,
            });
        }
    },
    /**
     * Deletes media.
     * In development: Deletes from local 'uploads' folder.
     * In production: Deletes from Azure.
     */
    deleteMedia: async (blobPath) => {
        try {
            if (isDev) {
                const relativePath = blobPath.replace(`${process.env.BACKEND_URL}/uploads/`, "");
                const filePath = path_1.default.join(process.cwd(), "uploads", relativePath);
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath);
                }
                return;
            }
            // Production: Delete from Azure
            const blockBlobClient = containerClient.getBlockBlobClient(new URL(blobPath).pathname.split('/').slice(2).join('/'));
            await blockBlobClient.deleteIfExists();
        }
        catch (error) {
            console.error("Delete error:", error);
        }
    }
};
//# sourceMappingURL=cloudStorage.js.map