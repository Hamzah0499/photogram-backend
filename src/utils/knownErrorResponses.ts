import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export const KNOWN_ERROR_RESPONSES: Record<number, string> = {
    [StatusCodes.OK]: getReasonPhrase(StatusCodes.OK),
    [StatusCodes.CREATED]: getReasonPhrase(StatusCodes.CREATED),
    [StatusCodes.ACCEPTED]: getReasonPhrase(StatusCodes.ACCEPTED),
    [StatusCodes.NO_CONTENT]: getReasonPhrase(StatusCodes.NO_CONTENT),
    [StatusCodes.BAD_REQUEST]: getReasonPhrase(StatusCodes.BAD_REQUEST),
    [StatusCodes.UNAUTHORIZED]: getReasonPhrase(StatusCodes.UNAUTHORIZED),
    [StatusCodes.FORBIDDEN]: getReasonPhrase(StatusCodes.FORBIDDEN),
    [StatusCodes.NOT_FOUND]: getReasonPhrase(StatusCodes.NOT_FOUND),
    [StatusCodes.METHOD_NOT_ALLOWED]: getReasonPhrase(StatusCodes.METHOD_NOT_ALLOWED),
    [StatusCodes.CONFLICT]: getReasonPhrase(StatusCodes.CONFLICT),
    [StatusCodes.INTERNAL_SERVER_ERROR]: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    [StatusCodes.BAD_GATEWAY]: getReasonPhrase(StatusCodes.BAD_GATEWAY),
    [StatusCodes.SERVICE_UNAVAILABLE]: getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE),
    [StatusCodes.GATEWAY_TIMEOUT]: getReasonPhrase(StatusCodes.GATEWAY_TIMEOUT),
};
