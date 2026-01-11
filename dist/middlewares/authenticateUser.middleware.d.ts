import { Request, Response, NextFunction } from "express";
import { selectUserDtoType } from "../db/schemas/user.schema";
declare global {
    namespace Express {
        interface Request {
            user?: selectUserDtoType;
        }
    }
}
export declare const authenticateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authenticateUser.middleware.d.ts.map