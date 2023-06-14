import { Injectable } from '@nestjs/common';
import { Prisma, Template } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    templateCreateInput: Prisma.TemplateUncheckedCreateInput,
  ): Promise<Template> {
    return this.prisma.template.create({
      data: templateCreateInput,
    });
  }

  async findAll(): Promise<Template[]> {
    return this.prisma.template.findMany({
      include: {
        specialization: true,
      },
    });
  }

  async findOne(id: number): Promise<Template> {
    return this.prisma.template.findUnique({ where: { id } });
  }

  async update(
    id: number,
    templateUpdateInput: Prisma.TemplateUncheckedUpdateInput,
  ) {
    return this.prisma.template.update({
      where: {
        id,
      },
      data: templateUpdateInput,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.template.delete({ where: { id } });
  }
}
