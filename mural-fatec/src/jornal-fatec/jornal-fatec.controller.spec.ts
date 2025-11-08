import { Test, TestingModule } from '@nestjs/testing';
import { JornalFatecController } from './jornal-fatec.controller';

describe('JornalFatecController', () => {
  let controller: JornalFatecController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JornalFatecController],
    }).compile();

    controller = module.get<JornalFatecController>(JornalFatecController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
