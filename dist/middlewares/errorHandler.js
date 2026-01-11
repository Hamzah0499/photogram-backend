"use strict";
// import { DrizzleError } from "drizzle-orm";
// import { DrizzleQueryError } from "drizzle-orm";
// import { NextFunction, Request, Response } from "express";
// import { ZodError } from "zod";
Object.defineProperty(exports, "__esModule", { value: true });
// const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
//     // default error
//     let status: number = 500;
//     let data = {
//         success: false,
//         message: 'Internal Server Error'
//     }
//     // Drizzle Error
//     if (error instanceof DrizzleError) {
//         status = 400;
//         data.message = `Database error: `+error.cause;
//         console.error(`Drizzle Error: `, error.cause);
//         return res.status(status).json(data);
//     }
//     // Drizzle Query Error
//     if (error instanceof DrizzleQueryError) {
//         // Check if the error is a unique constraint violation
//         if (error.cause && 'code' in error.cause && error.cause?.code === 'ER_DUP_ENTRY') {
//             status = 409;
//             data.message = 'Duplicate entry. Please use a different value.';
//         } else {
//             status = 400;
//             data.message = `Database query error`;
//         }
//         console.error(`Drizzle Query Error: `, error.cause);
//         return res.status(status).json(data);
//     }
//     // data validation errors
//     if (error instanceof ZodError) {
//         let errorsMessages = error.issues.map(err => err.message);
//         status = 422;
//         // data.message = errorsMessages.join(', ');
//         data.message = error.message;
//         data.success = false;
//         return res.status(status).json(data);
//     }
//     // Rate Limiter Error - Too Many Requests
//     // express-rate-limit error (usually has statusCode 429)
//     if (error.status === 429 || error.statusCode === 429) {
//         status = 429;
//         data.message = 'Too Many Requests';
//         return res.status(status).json(data);
//     }
//     // Custom status and message if available
//     if (error.status) status = error.status;
//     if (error.message) data.message = error.message;
//     if (error.success !== undefined) data.success = error.success;
//     return res.status(status).json(data);
// }
// export default errorHandler;
const AppError_1 = require("../types/AppError");
const http_status_codes_1 = require("http-status-codes");
// type ErrorType = {
// 	name: string;
// 	type: string;
// 	message: string;
// 	stack: string;
// 	status: number;
// 	statusCode: number | undefined;
// 	expose: boolean;
// };
class ErrorHandler {
    handleError = async (err, req, res, _next) => {
        this.logError(err, req);
        const statusCode = this.getStatusCode(err);
        res.status(statusCode).json(this.formatErrorResponse(err));
        // this.isTrustedError(err) ? next() : process.exit(1);
        // next();
    };
    logError = (error, req) => {
        console.error(`[errorHandler]: ${req.originalUrl}: ${this.getStatusCode(error)}: ${error.message}`);
    };
    // private isTrustedError = (error: Error) => {
    // 	if (error instanceof AppError) {
    // 		return error.isOperational;
    // 	}
    // 	return false;
    // };
    getStatusCode = (error) => {
        if (error instanceof AppError_1.AppError) {
            return error.httpCode;
        }
        return error && 'statusCode' in error && typeof error.statusCode === 'number'
            ? error.statusCode
            : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    };
    formatErrorResponse = (error) => {
        const cause = error.cause || {};
        console.error(">>:Error:", error);
        // console.error("Error cause:", cause?.sqlMessage?.split("'")[1]);
        return {
            name: error.name,
            // property: error instanceof AppError ? error.property : undefined,
            // message: error instanceof AppError ? error.description : 'Oops! Something went wrong.',
            // message: error instanceof AppError ? error.description : (cause?.code === 'ER_DUP_ENTRY') ? `Duplicate entry. Please use a different value for ${cause?.sqlMessage?.split("'")[1]}` : 'Oops! Something went wrong.',
            message: error instanceof AppError_1.AppError ? error.description : (cause?.code === 'ER_DUP_ENTRY') ? `Already exists. Please use a different value for ${cause?.sqlMessage?.split("'")[1]}` : 'Oops! Something went wrong.',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        };
    };
}
const errorHandler = new ErrorHandler();
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map