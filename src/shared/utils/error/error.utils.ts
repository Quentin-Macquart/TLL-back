import { HTTP400Error, HTTP404Error, DatabaseError } from '@app/shared/middleware';
import { errorLogger } from '@app/shared/utils/logger';
import { HttpStatusCode } from '@app/shared/middleware/error-handler/http-errors';

/**
 * Handle http client error
 * @param {Error} err
 * @returns {Error}
 */
export const handleHttpClientError = (err: Error, message?: string) => {
  if (err.name === 'ValidationError') {
    throw new HTTP400Error(err.message);
  }
  if (message) {
    throw new HTTP400Error(message);
  }
  throw err;
};

/**
 * Check param and value from a request
 * @param {unknown} param the param received in path parameter
 * @param {string} message the message sent in the error
 * @param {number} statusCode the status code sent
 * @param {string} varType the type of the variable checked
 */
export const checkValidityOrSendErrors = (
  param: unknown,
  message: string,
  statusCode: number,
  varType: string,
) => {
  const type: string = typeof param;
  if (!param || type !== varType) {
    switch (statusCode) {
      case HttpStatusCode.NOT_FOUND:
        throw new HTTP404Error(message);
      case HttpStatusCode.BAD_REQUEST:
        throw new HTTP400Error(message);
      default:
        throw new Error(message);
    }
  }
};

/**
 * Handle Data server errors
 * @param {any} err
 * @throws {DatabaseError}
 */
export const handleDaataServerError = err => {
  const { baseURL, url, params, data } = err.config;
  const jsonParams = JSON.stringify(params);
  const { response } = err;

  const errorMessage = `[ServerError] ${
    err.response ? err.response.statusText : 'Something went wrong in Database server'
  } in API :
  - BaseURL called : ${baseURL}
  - Path used : ${url}
  - Query params used : ${params ? jsonParams : 'None'}
  - Request body sent : ${data || 'None'}`;

  const error = new DatabaseError(
    errorMessage,
    err.code,
    response ? response.status : HttpStatusCode.INTERNAL_SERVER_ERROR,
  );
  errorLogger.error(error);
  throw error;
};
