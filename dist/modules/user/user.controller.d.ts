import { NextFunction, Request, Response } from "express";
export declare const UserController: {
    register: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    login: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    logout: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    refresh: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    uploadAvatar: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getByUsername: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    softDelete: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    permanentDelete: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    restore: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    verifyEmail: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    forgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    resetPassword: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    resendVerification: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    search: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
export default UserController;
//# sourceMappingURL=user.controller.d.ts.map