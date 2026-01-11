import { StatusCodes } from 'http-status-codes';
export declare class AppError extends Error {
    readonly name: string;
    readonly httpCode: number;
    readonly property: string | undefined;
    readonly description: string;
    readonly isOperational: boolean;
    constructor({ description, httpCode, isOperational, name, property, }: {
        name: string;
        httpCode: StatusCodes;
        description: string;
        isOperational?: boolean;
        property?: string;
    });
}
//# sourceMappingURL=AppError.d.ts.map