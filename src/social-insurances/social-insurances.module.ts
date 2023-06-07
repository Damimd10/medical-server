import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SocialInsurance } from './entities/social-insurance.entity';
import { SocialInsurancesController } from './social-insurances.controller';
import { SocialInsurancesService } from './social-insurances.service';

@Module({
  controllers: [SocialInsurancesController],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([SocialInsurance])],
  providers: [SocialInsurancesService],
})
export class SocialInsurancesModule {}
