import { Test, TestingModule } from '@nestjs/testing';
import { SocialInsurancesService } from './social-insurances.service';

describe('SocialInsurancesService', () => {
  let service: SocialInsurancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialInsurancesService],
    }).compile();

    service = module.get<SocialInsurancesService>(SocialInsurancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
