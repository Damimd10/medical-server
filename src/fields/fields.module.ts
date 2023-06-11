import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { FieldsController } from './fields.controller';
import { FieldsService } from './fields.service';

@Module({
  controllers: [FieldsController],
  imports: [PrismaModule],
  providers: [FieldsService],
})
export class FieldsModule {}
