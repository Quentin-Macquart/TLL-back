import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { checkValidityOrSendErrors, handleHttpClientError } from '@app/shared/utils';
import TYPES from '@app/shared/container/types';
import { PartyService } from '@app/components/party/services/party.service';
import { PartyConfig } from '@app/components/party/DAL/models';
import { ErrorMessages } from '@app/shared/utils/constants/error-messages';
import { HttpStatusCode } from '@app/shared/middleware/error-handler/http-errors';
import { ParsedQs } from 'qs';

@injectable()
export class PartyController {
  constructor(@inject(TYPES.PartyService) private readonly partyService: PartyService) {
    this.partyService = partyService;
  }

  /** Get party by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async findParty(req: Request, res: Response, _next: NextFunction) {
    try {
      const party = await this.partyService.findParty();
      // Send result and http status code
      res.status(HttpStatusCode.SUCCESS).send(party);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }

  /** Create party by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async createParty(req: Request, res: Response, _next: NextFunction) {
    try {
      const partyConfig: PartyConfig = req.body;
      const result = await this.partyService.createParty(partyConfig);
      res.status(HttpStatusCode.SUCCESS_WITH_NO_CONTENT).send(result);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }

  /** Update party by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async updateParty(req: Request, res: Response, _next: NextFunction) {
    try {
      const { _id } = req.query;
      const { body } = req;

      const checkBody = Object.keys(body);

      checkValidityOrSendErrors(
        checkBody.length,
        ErrorMessages.WRONG_PARAMETER,
        HttpStatusCode.NOT_FOUND,
        'number',
      );
      checkValidityOrSendErrors(
        _id as ParsedQs as unknown as string,
        ErrorMessages.WRONG_PARAMETER,
        HttpStatusCode.NOT_FOUND,
        'string',
      );

      const result = await this.partyService.updateParty(_id as ParsedQs as unknown as string, body);
      res.status(HttpStatusCode.SUCCESS_WITH_NO_CONTENT).send(result);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }

  /** Update statistics of current party
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async updateStatistics(req: Request, res: Response, _next: NextFunction) {
    try {
      const { partyId } = req.query;
      const { body } = req;
      const checkBody = Object.keys(body);

      checkValidityOrSendErrors(
        checkBody.length,
        ErrorMessages.WRONG_PARAMETER,
        HttpStatusCode.NOT_FOUND,
        'number',
      );
      checkValidityOrSendErrors(
        partyId as ParsedQs as unknown as string,
        ErrorMessages.WRONG_PARAMETER,
        HttpStatusCode.NOT_FOUND,
        'string',
      );
      const result = await this.partyService.updateStatistics(partyId as ParsedQs as unknown as string, body);
      res.status(HttpStatusCode.SUCCESS_WITH_NO_CONTENT).send(result);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }

  /** Delete Party by id
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  public async deleteParty(req: Request, res: Response, _next: NextFunction) {
    try {
      const { id } = req.params;

      checkValidityOrSendErrors(id, ErrorMessages.WRONG_PARAMETER, HttpStatusCode.NOT_FOUND, 'string');

      const party = await this.partyService.deleteParty(id);

      checkValidityOrSendErrors(party, ErrorMessages.WRONG_PARAMETER, HttpStatusCode.NOT_FOUND, 'object');

      res.status(HttpStatusCode.SUCCESS).send(party);
    } catch (e) {
      handleHttpClientError(e as Error);
    }
  }
}
