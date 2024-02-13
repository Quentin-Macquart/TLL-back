import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import TYPES from '@app/shared/container/types';
import { ILegend } from '@app/components/legend/DAL/interfaces/legend-interface';
import { Legend } from '@app/components/legend/DAL/models';

@injectable()
export class LegendService {
  constructor(@inject(TYPES.ILegend) private readonly legendRepository: ILegend) {
    this.legendRepository = legendRepository;
  }

  /** Get all legend
   *
   *
   * @returns {Legends}
   */
  public async findLegends(): Promise<Legend[]> {
    return this.legendRepository.findAll();
  }

  /** Get one legend by Id
   *
   * @param {string} id
   * @param {any} body
   * @returns {Legend}
   */
  public async findLegendById(id: string): Promise<Legend> {
    return this.legendRepository.findById(id);
  }
}
