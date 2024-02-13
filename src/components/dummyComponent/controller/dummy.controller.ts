import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { checkValidityOrSendErrors, handleHttpClientError } from '@app/shared/utils';
import TYPES from '@app/shared/container/types';
import { DummyService } from '@app/components/dummyComponent/services/dummy.service';
import { ErrorMessages } from '@app/shared/utils/constants/error-messages';
import { HttpStatusCode } from '@app/shared/middleware/error-handler/http-errors';

@injectable()
export class DummyController {
  constructor(@inject(TYPES.DummyService) private readonly dummyService: DummyService) {
    this.dummyService = dummyService;
  }

  /** Get dummyData by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async findDummyDataById(req: Request, res: Response, _next: NextFunction) {
    try {
      const { id } = req.params;
      checkValidityOrSendErrors(+id, ErrorMessages.WRONG_PARAMETER, HttpStatusCode.NOT_FOUND, 'number');

      const dummyData = await this.dummyService.findDummyDataById(id);
      // Send result and http status code
      res.status(HttpStatusCode.SUCCESS).send(dummyData);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }

  /** Update dummyData by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async createDummyData(req: Request, res: Response, _next: NextFunction) {
    try {
      const query = { id: req.params.id };
      const { body } = req;

      checkValidityOrSendErrors(
        body.length,
        ErrorMessages.WRONG_PARAMETER,
        HttpStatusCode.NOT_FOUND,
        'number',
      );
      checkValidityOrSendErrors(+query.id, ErrorMessages.WRONG_PARAMETER, HttpStatusCode.NOT_FOUND, 'number');

      const result = await this.dummyService.createDummyData(query.id, body);
      res.status(HttpStatusCode.SUCCESS_WITH_NO_CONTENT).send(result);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }

  /** Update one property on dummy data by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async updateDummyData(req: Request, res: Response, _next: NextFunction) {
    try {
      const query = { id: req.params.id };
      const { body } = req;

      checkValidityOrSendErrors(
        body.length,
        ErrorMessages.WRONG_PARAMETER,
        HttpStatusCode.NOT_FOUND,
        'number',
      );
      checkValidityOrSendErrors(+query.id, ErrorMessages.WRONG_PARAMETER, HttpStatusCode.NOT_FOUND, 'number');

      const result = await this.dummyService.updateDummyData(query.id, body);
      res.status(HttpStatusCode.SUCCESS_WITH_NO_CONTENT).send(result);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }

  /** Delete dummyData by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async deleteDummyData(req: Request, res: Response, _next: NextFunction) {
    try {
      const { id } = req.params;

      checkValidityOrSendErrors(+id, ErrorMessages.WRONG_PARAMETER, HttpStatusCode.NOT_FOUND, 'number');

      const dummyData = await this.dummyService.deleteDummyData(id);

      checkValidityOrSendErrors(dummyData, ErrorMessages.WRONG_PARAMETER, HttpStatusCode.NOT_FOUND, 'object');

      res.status(HttpStatusCode.SUCCESS).send(dummyData);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }
}
