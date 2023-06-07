import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';

import { patientProviders } from './patient.providers';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  controllers: [PatientsController],
  imports: [DatabaseModule],
  providers: [PatientsService, ...patientProviders],
})
export class PatientsModule {}
