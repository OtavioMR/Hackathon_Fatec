import { Test, TestingModule } from '@nestjs/testing';
import { JornalFatecService } from './jornal-fatec.service';

describe('JornalFatecService', () => {
  let service: JornalFatecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JornalFatecService],
    }).compile();

    service = module.get<JornalFatecService>(JornalFatecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
