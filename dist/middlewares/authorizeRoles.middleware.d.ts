import { Request, Response, NextFunction } from 'express';
import { USER_ROLE } from '../constants/user.constants';
export declare const authorizeRoles: (...roles: USER_ROLE[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authorizeRoles.middleware.d.ts.map