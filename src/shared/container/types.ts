const TYPES = {
  // Controllers
  DummyController: Symbol.for('DummyController'),
  LegendController: Symbol.for('LegendController'),
  SummonerController: Symbol.for('SummonerController'),
  PartyController: Symbol.for('PartyController'),

  // Services
  WebsocketClientService: Symbol.for('WebsocketClientService'),
  DummyService: Symbol.for('DummyService'),
  LegendService: Symbol.for('LegendService'),
  SummonerService: Symbol.for('SummonerService'),
  PartyService: Symbol.for('PartyService'),

  // Interfaces
  IDummyInterface: Symbol.for('IDummyInterface'),
  ILegend: Symbol.for('ILegend'),
  ISummoner: Symbol.for('ISummoner'),
  IParty: Symbol.for('IParty'),

  // Factories
  DummyFactory: Symbol.for('DummyFactory'),
  LegendFactory: Symbol.for('LegendFactory'),
  SummonerFactory: Symbol.for('SummonerFactory'),
  PartyFactory: Symbol.for('PartyFactory'),

  // Requests
  DummyApi: Symbol.for('DummyApi'),
  LegendApi: Symbol.for('LegendApi'),
  SummonerApi: Symbol.for('SummonerApi'),
  PartyApi: Symbol.for('PartyApi'),

  // Repository
  LegendRepository: Symbol.for('LegendRepository'),
  SummonerRepository: Symbol.for('SummonerRespository'),
  PartyRepository: Symbol.for('PartyRepository'),
};

Object.seal(TYPES);

export default TYPES;
