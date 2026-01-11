"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAndSaveImage = exports.generateImageName = exports.ensureUploadDir = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
/**
 * Ensure upload directory exists
 */
const ensureUploadDir = (dir) => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
};
exports.ensureUploadDir = ensureUploadDir;
/**
 * Generate unique image filename
 */
const generateImageName = (prefix = "image", ext = "webp") => {
    return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
};
exports.generateImageName = generateImageName;
const processAndSaveImage = async (buffer, uploadDir, filename, options = {}) => {
    const { width = 300, height = 300, quality = 80, format = "webp", } = options;
    const outputPath = path_1.default.join(uploadDir, filename);
    let image = (0, sharp_1.default)(buffer).resize(width, height);
    if (format === "jpeg") {
        image = image.jpeg({ quality });
    }
    else if (format === "png") {
        image = image.png({ quality });
    }
    else {
        image = image.webp({ quality });
    }
    await image.toFile(outputPath);
};
exports.processAndSaveImage = processAndSaveImage;
//# sourceMappingURL=sharpImageProcessor.js.map