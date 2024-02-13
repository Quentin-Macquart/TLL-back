import * as qs from 'qs';
import { PathLike } from 'fs';
import { Agent } from 'https';

export const BASE_URL_CONFIG = {
  returnRejectedPromiseOnError: true,
  withCredentials: true,
  timeout: 60000,
  baseURL: 'https:....',
  responseType: 'json',
  httpsAgent: new Agent({
    rejectUnauthorized: false,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params: PathLike) => qs.stringify(params, { indices: false }),
  },
};
