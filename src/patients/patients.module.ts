import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Patient } from './entities/patient.entity';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  controllers: [PatientsController],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientsService],
})
export class PatientsModule {}
