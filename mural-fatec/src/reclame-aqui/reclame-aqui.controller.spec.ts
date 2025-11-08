import { Test, TestingModule } from '@nestjs/testing';
import { ReclameAquiController } from './reclame-aqui.controller';

describe('ReclameAquiController', () => {
  let controller: ReclameAquiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReclameAquiController],
    }).compile();

    controller = module.get<ReclameAquiController>(ReclameAquiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
