import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { checkValidityOrSendErrors, handleHttpClientError } from '@app/shared/utils';
import TYPES from '@app/shared/container/types';
import { SummonerService } from '@app/components/summoner/services/summoner.service';
import { ErrorMessages } from '@app/shared/utils/constants/error-messages';
import { HttpStatusCode } from '@app/shared/middleware/error-handler/http-errors';
import { Summoner } from '@app/components/summoner/DAL/models';

@injectable()
export class SummonerController {
  constructor(@inject(TYPES.SummonerService) private readonly summonerService: SummonerService) {
    this.summonerService = summonerService;
  }

  /** Get summoners
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async findSummoners(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const summoners: Summoner[] = await this.summonerService.findSummoners();
      res.status(HttpStatusCode.SUCCESS).send(summoners);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }

  /** Get summoner by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async findSummonerById(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      checkValidityOrSendErrors(id, ErrorMessages.WRONG_PARAMETER, HttpStatusCode.NOT_FOUND, 'string');

      const summoner: Summoner = await this.summonerService.findSummonerById(id);
      res.status(HttpStatusCode.SUCCESS).send(summoner);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }
}
