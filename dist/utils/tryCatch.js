"use strict";
// import { NextFunction, Request, Response } from "express";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = void 0;
// export const tryCatch = (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         await controller(req, res, next);
//     } catch (error: any) {
//         console.error(`[Error]>>>: tryCatch : ** ${error.message} **\n`);
//         next(error);
//     }
// };
// import { NextFunction, Request, Response } from 'express';
const AppError_1 = require("../types/AppError");
const knownErrorResponses_1 = require("./knownErrorResponses");
// export const tryCatch =
// 	(controller: any) =>
// 	async (req: Request, res: Response, next: NextFunction) => {
// 		try {
// 			await controller(req, res);
// 		} catch (error) {
// 			next(error);
// 		}
// 	};
const tryCatch = async (callback, httpCode = 500) => {
    try {
        return await callback();
    }
    catch (error) {
        if (error instanceof Error) {
            throw new AppError_1.AppError({
                name: knownErrorResponses_1.KNOWN_ERROR_RESPONSES[httpCode],
                httpCode,
                description: error.message,
            });
        }
        throw error;
    }
};
exports.tryCatch = tryCatch;
//# sourceMappingURL=tryCatch.js.map