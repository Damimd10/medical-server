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
import { Field } from '@prisma/client';

import { AccessTokenGuard } from 'src/auth/guards';

import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { FieldsService } from './fields.service';

@UseGuards(AccessTokenGuard)
@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post()
  async create(@Body() createFieldDto: CreateFieldDto): Promise<Field> {
    return this.fieldsService.create(createFieldDto);
  }

  @Get()
  async findAll(): Promise<Field[]> {
    return this.fieldsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Field> {
    const field = await this.fieldsService.findOne(+id);

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    return field;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFieldDto: UpdateFieldDto,
  ): Promise<Field> {
    return this.fieldsService.update(+id, updateFieldDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const field = await this.fieldsService.findOne(+id);

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    return this.fieldsService.remove(+id);
  }
}
