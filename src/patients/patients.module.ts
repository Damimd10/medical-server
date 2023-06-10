import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  controllers: [PatientsController],
  imports: [PrismaModule],
  providers: [PatientsService],
})
export class PatientsModule {}
