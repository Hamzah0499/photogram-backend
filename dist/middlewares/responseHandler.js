"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler = (req, res, next) => {
    const originalSend = res.send;
    let isModified = false;
    res.send = function (body) {
        if (isModified) {
            return originalSend.call(this, body);
        }
        isModified = true;
        const parsedBody = JSON.parse(body);
        const newBody = {
            statusCode: res.statusCode,
            isSuccess: res.statusCode >= 200 && res.statusCode < 300,
            error: res.statusCode >= 200 && res.statusCode < 300 ? null : parsedBody,
            data: res.statusCode >= 200 && res.statusCode < 300 ? parsedBody : null,
        };
        return originalSend.call(this, newBody);
    };
    next();
};
exports.default = responseHandler;
//# sourceMappingURL=responseHandler.js.map