"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const AppError_1 = require("../types/AppError");
const http_status_codes_1 = require("http-status-codes");
const knownErrorResponses_1 = require("../utils/knownErrorResponses");
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req?.user) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                name: knownErrorResponses_1.KNOWN_ERROR_RESPONSES[http_status_codes_1.StatusCodes.UNAUTHORIZED],
                description: "Authentication required!"
            });
        }
        if (!roles.includes((req?.user).role)) {
            throw new AppError_1.AppError({
                httpCode: http_status_codes_1.StatusCodes.FORBIDDEN,
                name: knownErrorResponses_1.KNOWN_ERROR_RESPONSES[http_status_codes_1.StatusCodes.FORBIDDEN],
                description: "Access denied!"
            });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=authorizeRoles.middleware.js.map