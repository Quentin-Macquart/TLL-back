import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { checkValidityOrSendErrors, handleHttpClientError } from '@app/shared/utils';
import TYPES from '@app/shared/container/types';
import { LegendService } from '@app/components/legend/services/legend.service';
import { ErrorMessages } from '@app/shared/utils/constants/error-messages';
import { HttpStatusCode } from '@app/shared/middleware/error-handler/http-errors';
import { Legend } from '@app/components/legend/DAL/models';

@injectable()
export class LegendController {
  constructor(@inject(TYPES.LegendService) private readonly legendService: LegendService) {
    this.legendService = legendService;
  }

  /** Get legends
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async findLegends(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const legends: Legend[] = await this.legendService.findLegends();
      res.status(HttpStatusCode.SUCCESS).send(legends);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }

  /** Get legend by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async findLegendById(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      checkValidityOrSendErrors(id, ErrorMessages.WRONG_PARAMETER, HttpStatusCode.NOT_FOUND, 'string');

      const legend: Legend = await this.legendService.findLegendById(id);
      res.status(HttpStatusCode.SUCCESS).send(legend);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }
}
