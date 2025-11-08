import { Test, TestingModule } from '@nestjs/testing';
import { SugestoesController } from './sugestoes.controller';

describe('SugestoesController', () => {
  let controller: SugestoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SugestoesController],
    }).compile();

    controller = module.get<SugestoesController>(SugestoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
