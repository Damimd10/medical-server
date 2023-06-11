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
      data: createFieldDto,
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
      data: updateFieldDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.field.delete({ where: { id } });
  }
}
