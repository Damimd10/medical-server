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

import { AccessTokenGuard } from 'src/auth/guards';

import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplatesService } from './templates.service';

@UseGuards(AccessTokenGuard)
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  async create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
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
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    const template = await this.templatesService.findOne(+id);

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return this.templatesService.update(+id, updateTemplateDto);
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
