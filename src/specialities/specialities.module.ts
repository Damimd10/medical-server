import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { SpecialitiesController } from './specialities.controller';
import { SpecialitiesService } from './specialities.service';

@Module({
  controllers: [SpecialitiesController],
  imports: [PrismaModule],
  providers: [SpecialitiesService],
})
export class SpecialitiesModule {}
