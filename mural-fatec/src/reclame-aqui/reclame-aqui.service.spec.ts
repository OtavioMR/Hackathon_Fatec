import { Test, TestingModule } from '@nestjs/testing';
import { ReclameAquiService } from './reclame-aqui.service';

describe('ReclameAquiService', () => {
  let service: ReclameAquiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReclameAquiService],
    }).compile();

    service = module.get<ReclameAquiService>(ReclameAquiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
