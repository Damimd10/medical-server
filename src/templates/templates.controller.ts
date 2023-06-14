import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AccessTokenGuard } from 'src/auth/guards';

import { TemplatesService } from './templates.service';

@UseGuards(AccessTokenGuard)
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  async create(
    @Body() templateCreateInput: Prisma.TemplateUncheckedCreateInput,
  ) {
    return this.templatesService.create(templateCreateInput);
  }

  @Get()
  async findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const template = await this.templatesService.findOne(+id);

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return this.templatesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() templateUpdateInput: Prisma.TemplateUncheckedUpdateInput,
  ) {
    const template = await this.templatesService.findOne(+id);

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return this.templatesService.update(+id, templateUpdateInput);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const template = await this.templatesService.findOne(+id);

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return this.templatesService.remove(+id);
  }
}
