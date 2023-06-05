import { Test, TestingModule } from '@nestjs/testing';
import { SocialInsurancesController } from './social-insurances.controller';
import { SocialInsurancesService } from './social-insurances.service';

describe('SocialInsurancesController', () => {
  let controller: SocialInsurancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialInsurancesController],
      providers: [SocialInsurancesService],
    }).compile();

    controller = module.get<SocialInsurancesController>(SocialInsurancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
