// Dummy imports
import { DummyController } from '@app/components/dummyComponent/controller/dummy.controller';
import { DummyService } from '@app/components/dummyComponent/services/dummy.service';
import { IDummyInterface } from '@app/components/dummyComponent/DAL/interfaces/IDummyInterface';
import { DummyRepository } from '@app/components/dummyComponent/DAL/repositories/dummy-repository';
import { DummyFactory } from '@app/components/dummyComponent/DAL/factories/dummy-factory-data';
import { DummyApi } from '@app/components/dummyComponent/DAL/request/dummy-request';

// Legend imports
import { LegendController } from '@app/components/legend/controller/legend.controller';
import { LegendService } from '@app/components/legend/services/legend.service';
import { ILegend } from '@app/components/legend/DAL/interfaces/legend-interface';
import { LegendRepository } from '@app/components/legend/DAL/repositories/legend-repository';
import { LegendFactory } from '@app/components/legend/DAL/factories/legend-factory';
import { LegendApi } from '@app/components/legend/DAL/request/legend-request';

// Summoner imports
import { SummonerController } from '@app/components/summoner/controller/summoner.controller';
import { SummonerService } from '@app/components/summoner/services/summoner.service';
import { ISummoner } from '@app/components/summoner/DAL/interfaces/summoner-interface';
import { SummonerRepository } from '@app/components/summoner/DAL/repositories/summoner-repository';
import { SummonerFactory } from '@app/components/summoner/DAL/factories/summoner-factory';
import { SummonerApi } from '@app/components/summoner/DAL/request/summoner-request';

// Party imports
import { PartyController } from '@app/components/party/controller/party.controller';
import { PartyService } from '@app/components/party/services/party.service';
import { IParty } from '@app/components/party/DAL/interfaces/party-interface';
import { PartyFactory } from '@app/components/party/DAL/factories/party-factory';
import { PartyApi } from '@app/components/party/DAL/request/party-request';

// Shared imports
import TYPES from '@app/shared/container/types';

// Alerts imports
import { BASE_URL_CONFIG } from '@app/shared/utils/request/api.config';
import { RawAxiosRequestConfig } from 'axios';
import { Container } from 'inversify';
import { PartyRepository } from '@app/components/party/DAL/repositories/party-repository';

require('dotenv').config();

const { MONGO_CONNEXION_STRING, DB_NAME, LEGENDS_COLL, SUMMONERS_COLL, PARTY_COLL } = process.env;
const container = new Container();

// Controller
container.bind<DummyController>(TYPES.DummyController).to(DummyController);
container.bind<LegendController>(TYPES.LegendController).to(LegendController);
container.bind<SummonerController>(TYPES.SummonerController).to(SummonerController);
container.bind<PartyController>(TYPES.PartyController).to(PartyController);

// Services
container.bind<DummyService>(TYPES.DummyService).to(DummyService);
container.bind<LegendService>(TYPES.LegendService).to(LegendService);
container.bind<SummonerService>(TYPES.SummonerService).to(SummonerService);
container.bind<PartyService>(TYPES.PartyService).to(PartyService);

// Repositories
container.bind<IDummyInterface>(TYPES.IDummyInterface).to(DummyRepository);
container.bind<ILegend>(TYPES.ILegend).to(LegendRepository);
container.bind<ISummoner>(TYPES.ISummoner).to(SummonerRepository);
container.bind<IParty>(TYPES.IParty).to(PartyRepository);

// Factories
container.bind<DummyFactory>(TYPES.DummyFactory).to(DummyFactory);
container.bind<LegendFactory>(TYPES.LegendFactory).to(LegendFactory);
container.bind<SummonerFactory>(TYPES.SummonerFactory).to(SummonerFactory);
container.bind<PartyFactory>(TYPES.PartyFactory).to(PartyFactory);

// Request
container
  .bind<DummyApi>(TYPES.DummyApi)
  .toConstantValue(new DummyApi(BASE_URL_CONFIG as unknown as RawAxiosRequestConfig));

container
  .bind<LegendApi>(TYPES.LegendApi)
  .toConstantValue(
    new LegendApi(MONGO_CONNEXION_STRING as string, DB_NAME as string, LEGENDS_COLL as string),
  );

container
  .bind<SummonerApi>(TYPES.SummonerApi)
  .toConstantValue(
    new SummonerApi(MONGO_CONNEXION_STRING as string, DB_NAME as string, SUMMONERS_COLL as string),
  );

container
  .bind<PartyApi>(TYPES.PartyApi)
  .toConstantValue(new PartyApi(MONGO_CONNEXION_STRING as string, DB_NAME as string, PARTY_COLL as string));

// Seal
Object.seal(container);

export default container;
