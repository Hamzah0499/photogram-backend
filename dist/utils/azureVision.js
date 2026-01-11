"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeImage = void 0;
const ai_vision_image_analysis_1 = __importDefault(require("@azure-rest/ai-vision-image-analysis"));
const core_auth_1 = require("@azure/core-auth");
const endpoint = process.env.AZURE_VISION_ENDPOINT || "";
const key = process.env.AZURE_VISION_KEY || "";
const client = (0, ai_vision_image_analysis_1.default)(endpoint, new core_auth_1.AzureKeyCredential(key));
const features = [
    "Caption",
    "Tags",
    "Adult" // For NSFW/Safety check
];
const analyzeImage = async (imageBuffer) => {
    try {
        if (!key || !endpoint) {
            console.warn("Azure AI Vision credentials not found. Skipping analysis.");
            return null;
        }
        const result = await client.path("/imageanalysis:analyze").post({
            body: imageBuffer,
            queryParameters: {
                features,
            },
            contentType: "application/octet-stream",
        });
        const analysis = result.body;
        if (result.status !== "200") {
            throw analysis.error;
        }
        return {
            caption: analysis.captionResult?.text || "No caption generated",
            tags: analysis.tagsResult?.values?.map((t) => t.name) || [],
            isSafe: !analysis.adultResult?.isAdultContent && !analysis.adultResult?.isRacyContent,
            raw: analysis
        };
    }
    catch (error) {
        console.error("Azure AI Vision analysis failed:", error);
        return null;
    }
};
exports.analyzeImage = analyzeImage;
//# sourceMappingURL=azureVision.js.map