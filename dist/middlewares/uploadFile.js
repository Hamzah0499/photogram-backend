"use strict";
// import multer from "multer";
// import path from "path";
// import { Request } from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /*
// *
// * Just Multer to upload image
// * 
// */
// // 1️⃣ Storage configuration
// const storage = multer.diskStorage({
//     destination: (
//         req: Request,
//         file: Express.Multer.File,
//         cb
//     ) => {
//         cb(null, "uploads/");
//     },
//     filename: (
//         req: Request,
//         file: Express.Multer.File,
//         cb
//     ) => {
//         const uniqueName =
//             Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(
//             null,
//             uniqueName + path.extname(file.originalname)
//         );
//     },
// });
// // 2️⃣ File filter (image validation)
// const fileFilter = (
//     req: Request,
//     file: Express.Multer.File,
//     cb: multer.FileFilterCallback
// ) => {
//     const allowedTypes = /jpeg|jpg|png|webp/;
//     const isExtValid = allowedTypes.test(
//         path.extname(file.originalname).toLowerCase()
//     );
//     const isMimeValid = allowedTypes.test(file.mimetype);
//     if (isExtValid && isMimeValid) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only image files are allowed"));
//     }
// };
// // 3️⃣ Multer instance
// const uploadFile = multer({
//     storage,
//     limits: {
//         fileSize: 2 * 1024 * 1024, // 2MB
//     },
//     fileFilter,
// });
// export default uploadFile;
// ======================================================================================
const multer_1 = __importDefault(require("multer"));
/*
*
* Multer with sharp image processing to upload image
*
*/
// 1️⃣ Memory storage (IMPORTANT)
const storage = multer_1.default.memoryStorage();
// 2️⃣ File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|mp4|mov|quicktime/;
    const isMimeValid = allowedTypes.test(file.mimetype);
    console.log("File: ", file);
    if (isMimeValid) {
        cb(null, true);
    }
    else {
        cb(new Error("Only image and video files are allowed"));
    }
};
// 3️⃣ Multer instance
const uploadFile = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
    },
    fileFilter,
});
exports.default = uploadFile;
//# sourceMappingURL=uploadFile.js.map