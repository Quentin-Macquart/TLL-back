import { DummyModel } from '@app/components/dummyComponent/DAL/models/index';
import { injectable } from 'inversify';
import { Api } from '@app/shared/utils/request/api-request';
import { AxiosRequestConfig, AxiosResponse, RawAxiosRequestConfig } from 'axios';
import { handleDaataServerError } from '@app/shared/utils';

@injectable()
export class DummyApi extends Api {
  public constructor(config?: RawAxiosRequestConfig) {
    super(config);

    // this middleware is been called right before the http request is made.
    this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
      ...param,
    }));

    // this middleware is been called right before the response is get it by the method that triggers the request
    this.api.interceptors.response.use((param: AxiosResponse) => ({
      ...param,
    }));

    this.findById = this.findById.bind(this);
  }

  /** Get dummyData by id
   *
   * @returns {Promise<DummyModel[]>}
   */
  public async findById(id: string): Promise<DummyModel> {
    const onlyAvailable = 'true';
    try {
      const res: AxiosResponse<DummyModel> = await this.get<DummyModel, AxiosResponse<DummyModel>>(
        `DummyDatabasePath`,
        {
          params: { onlyAvailable },
          headers: {
            authorization: `Bearer`,
          },
        },
      );
      return this.success(res);
    } catch (e) {
      return handleDaataServerError(e);
    }
  }

  /** Update dummyData
   *
   * @param {string} id
   * @param {body} any
   * @returns {Promise<any>}
   */
  public async update(id: string, body: any): Promise<any> {
    try {
      const res: AxiosResponse<any> = await this.put<any, AxiosResponse<any>>(`DummyDatabasePath`, body, {
        headers: {
          authorization: `Bearer`,
        },
      });
      return this.success(res);
    } catch (e) {
      return handleDaataServerError(e);
    }
  }

  /** Get or update dummyObject by id/body
   *
   * @param {string} id
   * @param {body} any
   * @returns {Promise<any>}
   */
  public async create(id: string, body: any): Promise<any> {
    try {
      const res: AxiosResponse<any> = await this.post<any, AxiosResponse<any>>(`DummyDatabasePath`, body, {
        headers: {
          authorization: `Bearer`,
        },
      });
      return this.success(res);
    } catch (e) {
      return handleDaataServerError(e);
    }
  }

  /** Get or update dummyObject by id/body
   *
   * @param {string} id
   * @param {body} any
   * @returns {Promise<any>}
   */
  public async remove(id: string): Promise<void> {
    try {
      const res: AxiosResponse<any> = await this.delete<any, AxiosResponse<any>>(`DummyDatabasePath`, {
        params: { id },
        headers: {
          authorization: `Bearer`,
        },
      });
      return this.success(res);
    } catch (e) {
      return handleDaataServerError(e);
    }
  }
}
