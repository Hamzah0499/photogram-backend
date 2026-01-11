"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    name;
    httpCode;
    property;
    description;
    isOperational;
    constructor({ description, httpCode, isOperational = true, name, property, }) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        this.property = property;
        this.description = description;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=AppError.js.map