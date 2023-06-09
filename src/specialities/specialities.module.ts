import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Speciality } from './entities/speciality.entity';
import { SpecialitiesController } from './specialities.controller';
import { SpecialitiesService } from './specialities.service';

@Module({
  controllers: [SpecialitiesController],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Speciality])],
  providers: [SpecialitiesService],
})
export class SpecialitiesModule {}
