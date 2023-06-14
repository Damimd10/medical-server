import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';

@Module({
  controllers: [TemplatesController],
  imports: [PrismaModule],
  providers: [TemplatesService],
})
export class TemplatesModule {}
