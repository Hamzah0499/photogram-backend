"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../types/AppError");
const knownErrorResponses_1 = require("./knownErrorResponses");
const getErrors = (errors) => {
    const result = {};
    if (Array.isArray(errors._errors) && errors._errors.length > 0) {
        result._errors = errors._errors;
    }
    for (const [key, value] of Object.entries(errors)) {
        if (key === '_errors')
            continue;
        if (typeof value === 'object' && value !== null) {
            if ('_errors' in value &&
                Array.isArray(value._errors) &&
                value._errors.length > 0) {
                result[key] = value._errors[0];
            }
            else {
                const nestedErrors = getErrors(value);
                Object.assign(result, { [key]: nestedErrors });
            }
        }
    }
    return result;
};
const validateRequest = (schema, validateDataFrom = 'body') => {
    return (req, res, next) => {
        const { data, error } = schema.safeParse(validateDataFrom === 'query' ? req.query : req.body);
        console.log("validateRequest Error: ", error);
        if (error) {
            const errors = getErrors(error.format());
            Object.keys(errors).map(key => {
                throw new AppError_1.AppError({
                    name: knownErrorResponses_1.KNOWN_ERROR_RESPONSES[http_status_codes_1.StatusCodes.BAD_REQUEST],
                    httpCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                    description: (Array.isArray(errors[key])
                        ? errors[key][0]
                        : errors[key]),
                    property: key,
                });
            });
        }
        if (validateDataFrom === 'query')
            req.queryParams = data;
        else if (validateDataFrom === 'body')
            req.body = data;
        next();
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validateRequest.js.map