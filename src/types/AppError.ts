import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly property: string | undefined;
  public readonly description: string;
  public readonly isOperational: boolean;

  constructor({
    description,
    httpCode,
    isOperational = true,
    name,
    property,
  }: {
    name: string;
    httpCode: StatusCodes;
    description: string;
    isOperational?: boolean;
    property?: string;
  }) {
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
