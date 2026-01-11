import { NextFunction, Request, Response } from "express";
export declare const ReplyController: {
    add: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getByComment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=reply.controller.d.ts.map