import { NextFunction, Request, Response } from "express";
export declare const CommentController: {
    add: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getByPost: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=comment.controller.d.ts.map