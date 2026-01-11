// import multer from "multer";
// import path from "path";
// import { Request } from "express";

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

import multer from "multer";
import { Request } from "express";

/*
*
* Multer with sharp image processing to upload image
* 
*/

// 1️⃣ Memory storage (IMPORTANT)
const storage = multer.memoryStorage();

// 2️⃣ File filter
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const allowedTypes = /jpeg|jpg|png|webp|mp4|mov|quicktime/;
    const isMimeValid = allowedTypes.test(file.mimetype);

    console.log("File: ", file);

    if (isMimeValid) {
        cb(null, true);
    } else {
        cb(new Error("Only image and video files are allowed"));
    }
};

// 3️⃣ Multer instance
const uploadFile = multer({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
    },
    fileFilter,
});

export default uploadFile;


