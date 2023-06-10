import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { SocialInsurancesController } from './social-insurances.controller';
import { SocialInsurancesService } from './social-insurances.service';

@Module({
  controllers: [SocialInsurancesController],
  imports: [PrismaModule],
  providers: [SocialInsurancesService],
})
export class SocialInsurancesModule {}
