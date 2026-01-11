"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNOWN_ERROR_RESPONSES = void 0;
const http_status_codes_1 = require("http-status-codes");
exports.KNOWN_ERROR_RESPONSES = {
    [http_status_codes_1.StatusCodes.OK]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.OK),
    [http_status_codes_1.StatusCodes.CREATED]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.CREATED),
    [http_status_codes_1.StatusCodes.ACCEPTED]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.ACCEPTED),
    [http_status_codes_1.StatusCodes.NO_CONTENT]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NO_CONTENT),
    [http_status_codes_1.StatusCodes.BAD_REQUEST]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_REQUEST),
    [http_status_codes_1.StatusCodes.UNAUTHORIZED]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.UNAUTHORIZED),
    [http_status_codes_1.StatusCodes.FORBIDDEN]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.FORBIDDEN),
    [http_status_codes_1.StatusCodes.NOT_FOUND]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_FOUND),
    [http_status_codes_1.StatusCodes.METHOD_NOT_ALLOWED]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.METHOD_NOT_ALLOWED),
    [http_status_codes_1.StatusCodes.CONFLICT]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.CONFLICT),
    [http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
    [http_status_codes_1.StatusCodes.BAD_GATEWAY]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_GATEWAY),
    [http_status_codes_1.StatusCodes.SERVICE_UNAVAILABLE]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.SERVICE_UNAVAILABLE),
    [http_status_codes_1.StatusCodes.GATEWAY_TIMEOUT]: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.GATEWAY_TIMEOUT),
};
//# sourceMappingURL=knownErrorResponses.js.map