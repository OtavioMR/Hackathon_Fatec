import { Test, TestingModule } from '@nestjs/testing';
import { SugestoesService } from './sugestoes.service';

describe('SugestoesService', () => {
  let service: SugestoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SugestoesService],
    }).compile();

    service = module.get<SugestoesService>(SugestoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
