import { Injectable } from '@nestjs/common';
import { Template } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { AttachFieldDto } from './dto/attach-field.dto';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async attachField(attachFieldDto: AttachFieldDto): Promise<any> {
    const { templateId, fieldId } = attachFieldDto;

    return this.prisma.fieldsOnTemplates.create({
      data: {
        field_id: fieldId,
        template_id: templateId,
      },
    });
  }

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const { specializationId, ...createTemplateData } = createTemplateDto;
    return this.prisma.template.create({
      data: {
        name: createTemplateData.name,
        template_type: createTemplateData.templateType,
        alternative_name: createTemplateData.alternativeName,
        specialization: { connect: { id: specializationId } },
      },
    });
  }

  async findAll(): Promise<Template[]> {
    const templates = await this.prisma.template.findMany({
      include: {
        fields_on_templates: {
          include: {
            field: true,
          },
        },
        specialization: true,
      },
    });

    return templates;
  }

  async findOne(id: number): Promise<Template> {
    return this.prisma.template.findUnique({ where: { id } });
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto) {
    const { specializationId, ...updateTemplateData } = updateTemplateDto;

    return this.prisma.template.update({
      where: {
        id,
      },
      data: {
        name: updateTemplateData.name,
        template_type: updateTemplateData.templateType,
        alternative_name: updateTemplateData.alternativeName,
        specialization: { connect: { id: specializationId } },
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.template.delete({ where: { id } });
  }
}
