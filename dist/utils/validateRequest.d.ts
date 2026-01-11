import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod/v4';
export declare const validateRequest: (schema: ZodSchema, validateDataFrom?: "query" | "body") => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validateRequest.d.ts.map