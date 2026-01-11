"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
/**
 * Advanced Media Processing: Resizing and Watermarking
 * This helps optimize storage and add branding.
 */
const processImage = async (buffer, username = "Photogram") => {
    try {
        // 1. Resize image to a standard width (e.g., 1080px for high quality)
        // 2. Add an SVG watermark overlay
        const watermarkSvg = `
            <svg width="400" height="60">
                <style>
                    .text { fill: white; font-size: 24px; font-weight: bold; opacity: 0.5; font-family: sans-serif; }
                </style>
                <text x="50%" y="50%" text-anchor="middle" class="text">uploaded by @${username}</text>
            </svg>
        `;
        const processedImageBuffer = await (0, sharp_1.default)(buffer)
            .resize(1080) // Resize to 1080px width, height auto
            .composite([
            {
                input: Buffer.from(watermarkSvg),
                gravity: "southeast", // Bottom-right corner
            },
        ])
            .webp({ quality: 80 }) // Convert to webp for better compression
            .toBuffer();
        return processedImageBuffer;
    }
    catch (error) {
        console.error("Image processing failed:", error);
        return buffer; // Fallback to original buffer if processing fails
    }
};
exports.processImage = processImage;
//# sourceMappingURL=mediaProcessor.js.map