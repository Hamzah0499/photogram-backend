// import { NextFunction, Request, Response } from "express";

// export const tryCatch = (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         await controller(req, res, next);
//     } catch (error: any) {
//         console.error(`[Error]>>>: tryCatch : ** ${error.message} **\n`);

//         next(error);
//     }
// };


// import { NextFunction, Request, Response } from 'express';
import { AppError } from "../types/AppError";
import { KNOWN_ERROR_RESPONSES } from "./knownErrorResponses";

// export const tryCatch =
// 	(controller: any) =>
// 	async (req: Request, res: Response, next: NextFunction) => {
// 		try {
// 			await controller(req, res);
// 		} catch (error) {
// 			next(error);
// 		}
// 	};

export const tryCatch = async <T>(callback: CallableFunction, httpCode: number = 500): Promise<T> => {
  try {
    return await callback();
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError({
        name: KNOWN_ERROR_RESPONSES[httpCode],
        httpCode,
        description: error.message,
      });
    }
    throw error;
  }
};
