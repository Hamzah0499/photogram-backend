import { NextFunction, Request, Response } from "express";
export declare const PostController: {
    create: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAll: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getByUsername: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    search: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    explore: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=post.controller.d.ts.map