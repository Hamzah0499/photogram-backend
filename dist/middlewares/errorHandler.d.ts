import { NextFunction, Request, Response } from 'express';
declare class ErrorHandler {
    handleError: (err: Error, req: Request, res: Response, _next: NextFunction) => Promise<void>;
    private logError;
    private getStatusCode;
    private formatErrorResponse;
}
declare const errorHandler: ErrorHandler;
export default errorHandler;
//# sourceMappingURL=errorHandler.d.ts.map