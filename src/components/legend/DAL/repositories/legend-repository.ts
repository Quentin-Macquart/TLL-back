import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import TYPES from '@app/shared/container/types';
import { ILegend } from '@app/components/legend/DAL/interfaces/legend-interface';
import { LegendFactory } from '@app/components/legend/DAL/factories/legend-factory';
import { LegendApi } from '@app/components/legend/DAL/request/legend-request';
import { Legend } from '@app/components/legend/DAL//models';

@injectable()
export class LegendRepository implements ILegend {
  constructor(
    @inject(TYPES.LegendFactory) private readonly legendFactory: LegendFactory,
    @inject(TYPES.LegendApi) private readonly legendApi: LegendApi,
  ) {
    this.legendFactory = legendFactory;
    this.legendApi = legendApi;
  }

  /** Get all legends information
   *
   *
   * @returns {Promise<Legend[]>}
   */
  public async findAll(): Promise<Legend[]> {
    return this.legendApi.find();
  }

  /** Get legend info by id
   *
   * @param {number} id
   * @returns {Promise<Legend>}
   */
  public async findById(id: string): Promise<Legend> {
    return this.legendApi.findById(id);
  }
}
