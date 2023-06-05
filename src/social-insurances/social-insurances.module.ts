import { Module } from '@nestjs/common';
import { SocialInsurancesService } from './social-insurances.service';
import { SocialInsurancesController } from './social-insurances.controller';

@Module({
  controllers: [SocialInsurancesController],
  providers: [SocialInsurancesService]
})
export class SocialInsurancesModule {}
