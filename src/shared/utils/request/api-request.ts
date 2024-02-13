import { BASE_URL_CONFIG } from '@app/shared/utils/request/api.config';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { injectable } from 'inversify';

@injectable()
export class Api {
  public api: any;

  /**
   * Creates an instance of Api.
   * @param {import('axios').RawAxiosRequestConfig} [config] - axios configuration.
   * @memberof Api
   */
  public constructor(config?: RawAxiosRequestConfig) {
    this.api = axios.create(config);

    this.api.interceptors.request.use((param: RawAxiosRequestConfig) => {
      return {
        baseUrl: BASE_URL_CONFIG.baseURL,
        ...param,
      } as InternalAxiosRequestConfig<any>; // Cast the return type to InternalAxiosRequestConfig<any>
    });

    this.getUri = this.getUri.bind(this);
    this.request = this.request.bind(this);
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
    this.head = this.head.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.patch = this.patch.bind(this);
  }

  /**
   * Get Uri
   *
   * @param {import('axios').AxiosRequestConfig} [config]
   * @returns {string}
   * @memberof Api
   */
  public getUri(config?: AxiosRequestConfig): string {
    return this.api.getUri(config);
  }

  /**
   * Generic request.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside an axios response format.
   * @param {import('axios').AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP axios response payload.
   * @memberof Api
   */
  public request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.api.request(config);
  }

  /**
   * HTTP GET method, used to fetch data `statusCode`: 200.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside an axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import('axios').AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} HTTP `axios` response payload.
   * @memberof Api
   */
  public get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.api.get(url, config);
  }

  /**
   * HTTP DELETE method, `statusCode`: 204 No Content.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside an axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import('axios').AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.api.delete(url, config);
  }

  /**
   * HTTP HEAD method.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside an axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import('axios').AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public head<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.api.head(url, config);
  }

  /**
   * HTTP POST method `statusCode`: 201 Created.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside an axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be sent as the `request body`,
   * @param {import('axios').AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public post<T, B, R = AxiosResponse<T>>(url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
    return this.api.post(url, data, config);
  }

  /**
   * HTTP PUT method.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside an axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be sent as the `request body`,
   * @param {import('axios').AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public put<T, B, R = AxiosResponse<T>>(url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
    return this.api.put(url, data, config);
  }

  /**
   * HTTP PATCH method.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside an axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be sent as the `request body`,
   * @param {import('axios').AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public patch<T, B, R = AxiosResponse<T>>(url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
    return this.api.patch(url, data, config);
  }

  /**
   * Returns success response
   * @template T - type.
   * @param {import('axios').AxiosResponse<T>} response - axios response.
   * @returns {T} - expected object.
   * @memberof Api
   */
  // prettier-ignore
  public success<T>(response: AxiosResponse<T>): T {
  return response.data;
}

  /**
   * Throws error
   * @param {AxiosError<Error>} error
   * @throws {AxiosError<Error>}
   */
  // prettier-ignore
  public error(error: AxiosError<Error>) {
    throw error;
  }
}
