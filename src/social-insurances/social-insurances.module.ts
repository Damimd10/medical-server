import { Module } from '@nestjs/common';

import { SocialInsurancesController } from './social-insurances.controller';
import { SocialInsurancesService } from './social-insurances.service';

@Module({
  controllers: [SocialInsurancesController],
  providers: [SocialInsurancesService],
})
export class SocialInsurancesModule {}
