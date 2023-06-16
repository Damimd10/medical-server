import { Injectable } from '@nestjs/common';
import { Field } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';

@Injectable()
export class FieldsService {
  constructor(private prisma: PrismaService) {}

  async create(createFieldDto: CreateFieldDto): Promise<Field> {
    return this.prisma.field.create({
      data: {
        field_id: createFieldDto.fieldId,
        input_type: createFieldDto.inputType,
        label: createFieldDto.label,
        default_value: createFieldDto.defaultValue,
        alternative_name: createFieldDto.alternativeName,
        full_name: createFieldDto.fullName,
        right_label: createFieldDto.rightLabel,
      },
    });
  }

  async findAll(): Promise<Field[]> {
    return this.prisma.field.findMany();
  }

  async findOne(id: number): Promise<Field> {
    return this.prisma.field.findUnique({ where: { id } });
  }

  async update(id: number, updateFieldDto: UpdateFieldDto): Promise<Field> {
    return this.prisma.field.update({
      where: {
        id,
      },
      data: {
        field_id: updateFieldDto.fieldId,
        input_type: updateFieldDto.inputType,
        label: updateFieldDto.label,
        default_value: updateFieldDto.defaultValue,
        alternative_name: updateFieldDto.alternativeName,
        full_name: updateFieldDto.fullName,
        right_label: updateFieldDto.rightLabel,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.field.delete({ where: { id } });
  }
}
