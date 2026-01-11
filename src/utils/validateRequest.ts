// import { AppError } from '../../types/AppError';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodSchema } from 'zod/v4';
import { AppError } from '../types/AppError';
import { KNOWN_ERROR_RESPONSES } from './knownErrorResponses';

type GetErrorsPropType =
  | { _errors: string[] }
  | { [k: string]: GetErrorsPropType };

const getErrors = (
  errors: GetErrorsPropType,
): Record<string, string | string[]> => {
  const result: Record<string, string | string[]> = {};

  if (Array.isArray(errors._errors) && errors._errors.length > 0) {
    result._errors = errors._errors;
  }

  for (const [key, value] of Object.entries(errors)) {
    if (key === '_errors') continue;

    if (typeof value === 'object' && value !== null) {
      if (
        '_errors' in value &&
        Array.isArray(value._errors) &&
        value._errors.length > 0
      ) {
        result[key] = value._errors[0];
      } else {
        const nestedErrors = getErrors(value);
        Object.assign(result, { [key]: nestedErrors });
      }
    }
  }

  return result;
};

export const validateRequest = (
  schema: ZodSchema,
  validateDataFrom: 'query' | 'body' = 'body',
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { data, error } = schema.safeParse(
      validateDataFrom === 'query' ? req.query : req.body,
    );

    console.log("validateRequest Error: ", error);

    if (error) {
      const errors = getErrors(error.format());
      Object.keys(errors).map(key => {
        throw new AppError({
          name: KNOWN_ERROR_RESPONSES[StatusCodes.BAD_REQUEST],
          httpCode: StatusCodes.BAD_REQUEST,
          description: (Array.isArray(errors[key])
            ? errors[key][0]
            : errors[key]) as string,
          property: key,
        });
      });
    }

    if (validateDataFrom === 'query') (req as any).queryParams = data;
    else if (validateDataFrom === 'body') req.body = data;

    next();
  };
};
