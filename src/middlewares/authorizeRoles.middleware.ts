import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/AppError';
import { StatusCodes } from 'http-status-codes';
import { KNOWN_ERROR_RESPONSES } from '../utils/knownErrorResponses';
import { USER_ROLE } from '../constants/user.constants';


export const authorizeRoles = (...roles: USER_ROLE[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req?.user) {
            throw new AppError({
                httpCode: StatusCodes.UNAUTHORIZED,
                name: KNOWN_ERROR_RESPONSES[StatusCodes.UNAUTHORIZED],
                description: "Authentication required!"
            })
        }

        if (!roles.includes((req?.user as any).role as USER_ROLE)) {
            throw new AppError({
                httpCode: StatusCodes.FORBIDDEN,
                name: KNOWN_ERROR_RESPONSES[StatusCodes.FORBIDDEN],
                description: "Access denied!"
            })
        }

        next();
    };
};