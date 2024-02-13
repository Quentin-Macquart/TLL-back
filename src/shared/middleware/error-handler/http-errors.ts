/* eslint-disable max-classes-per-file */

import { errorLogger } from '@app/shared/utils/logger';

export enum HttpStatusCode {
  SUCCESS = 200,
  SUCCESS_CREATED = 201,
  SUCCESS_WITH_NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
export class HTTPClientError extends Error {
  readonly statusCode!: number;

  code!: string;

  constructor(message: object | string, code?: string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.name = 'ClientError';
    if (code) {
      this.code = code;
    }
    errorLogger.error(this);
  }
}
class BaseError extends Error {
  public readonly name: string;

  public readonly httpCode: HttpStatusCode;

  public readonly isOperational: boolean;

  constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
    errorLogger.error(this);
  }
}
export class HTTPServerError extends Error {
  readonly statusCode!: number;

  readonly externalStatusCode!: number;

  readonly status!: string;

  code!: string;

  constructor(name, message: object | string, code?: string, externalStatusCode?: number) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.name = name;
    if (externalStatusCode) {
      this.externalStatusCode = externalStatusCode;
    }
    if (code) {
      this.code = code;
    }
    this.status =
      `${this.statusCode}`.startsWith('4') || `${this.externalStatusCode}`.startsWith('4') ? 'fail' : 'error';
    errorLogger.error(this);
  }
}
export class DatabaseError extends HTTPServerError {
  readonly statusCode = 503;

  constructor(message: string | object, code?: string, externalStatusCode?: number) {
    super('DatabaseError', message, code, externalStatusCode);
  }
}
export class HTTP500Error extends BaseError {
  constructor(
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
    isOperational = true,
    description = 'internal server error',
  ) {
    super(name, httpCode, description, isOperational);
  }
}
export class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400;

  constructor(message: string | object = 'Bad Request', code?: string) {
    super(message, code);
  }
}

export class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401;

  constructor(message: string | object = 'Unauthorized', code?: string) {
    super(message, code);
  }
}

export class HTTP403Error extends HTTPClientError {
  readonly statusCode = 403;

  constructor(message: string | object = 'Forbidden', code?: string) {
    super(message, code);
  }
}
export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404;

  constructor(message: string | object = 'Not found', code?: string) {
    super(message, code);
  }
}
