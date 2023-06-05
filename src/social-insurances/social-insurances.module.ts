import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';

import { SocialInsurancesController } from './social-insurances.controller';
import { socialInsuranceProviders } from './social-insurances.providers';
import { SocialInsurancesService } from './social-insurances.service';

@Module({
  controllers: [SocialInsurancesController],
  imports: [DatabaseModule],
  providers: [SocialInsurancesService, ...socialInsuranceProviders],
})
export class SocialInsurancesModule {}
