import { NextFunction, Request, Response } from "express";
export declare const FollowerController: {
    follow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    unfollow: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getFollowers: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getFollowing: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=follower.controller.d.ts.map