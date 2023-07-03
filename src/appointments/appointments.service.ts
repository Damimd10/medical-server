import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { Appointment } from '@prisma/client';

import { AttachFieldDto } from './dto/attach-field.dto';
import { AttachTemplateDto } from './dto/attach-template.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UpdateFieldDto } from './dto/update-fields-dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async attachField(attachFieldDto: AttachFieldDto) {
    return this.prisma.appointmentField.create({
      data: {
        appointment_id: attachFieldDto.appointmentId,
        field_id: attachFieldDto.fieldId,
        value: attachFieldDto.value,
      },
    });
  }

  async detachField(appointmentId: number, fields: number[]) {
    return this.prisma.appointmentField.deleteMany({
      where: {
        appointment_id: appointmentId,
        field_id: {
          in: fields,
        },
      },
    });
  }

  async attachTemplate(attachTemplateDto: AttachTemplateDto) {
    return this.prisma.appointmentTemplate.create({
      data: {
        appointment_id: attachTemplateDto.appointmentId,
        template_id: attachTemplateDto.templateId,
      },
    });
  }

  async updateAttachedField(id: number, data: AttachFieldDto) {
    return this.prisma.appointment.update({
      where: {
        id,
      },
      data: {
        appointment_fields: {
          update: {
            where: {
              appointment_id_field_id: {
                appointment_id: data.appointmentId,
                field_id: data.fieldId,
              },
            },
            data: {
              value: data.value,
            },
          },
        },
      },
    });
  }

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return this.prisma.appointment.create({
      data: {
        date: createAppointmentDto.date,
        patient: {
          connect: {
            id: createAppointmentDto.patientId,
          },
        },
        doctor: {
          connect: {
            id: createAppointmentDto.doctorId,
          },
        },
        speciality: {
          connect: {
            id: createAppointmentDto.specialityId,
          },
        },
      },
      include: {
        doctor: true,
        patient: true,
        speciality: true,
      },
    });
  }

  async findAll(): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({
      include: {
        doctor: true,
        patient: true,
        speciality: true,
      },
    });
  }

  async findOne(id: number): Promise<Appointment> {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: {
        appointment_fields: {
          include: {
            field: true,
          },
        },
        appointment_templates: {
          include: {
            template: true,
          },
        },
        doctor: true,
        patient: true,
        speciality: true,
      },
    });
  }

  async updateFields(id: number, fields: UpdateFieldDto[]) {
    const collection = await this.prisma.$transaction(
      fields.map((field) =>
        this.prisma.appointmentField.upsert({
          where: {
            appointment_id_field_id: {
              appointment_id: id,
              field_id: field.fieldId,
            },
          },
          update: {
            value: field.value,
          },
          create: {
            appointment_id: id,
            field_id: field.fieldId,
            value: field.value,
          },
        }),
      ),
    );

    return collection;
  }

  async updateTemplates(id: number, templates: UpdateTemplateDto[]) {
    const collection = await this.prisma.$transaction(
      templates.map((template) =>
        this.prisma.appointmentTemplate.upsert({
          where: {
            appointment_id_template_id: {
              appointment_id: id,
              template_id: template.templateId,
            },
          },
          update: {
            template_id: template.templateId,
          },
          create: {
            appointment_id: id,
            template_id: template.templateId,
          },
        }),
      ),
    );

    return collection;
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.prisma.appointment.update({
      where: {
        id,
      },
      data: {
        date: updateAppointmentDto.date,
        patient: {
          connect: {
            id: updateAppointmentDto.patientId,
          },
        },
        doctor: {
          connect: {
            id: updateAppointmentDto.doctorId,
          },
        },
        speciality: {
          connect: {
            id: updateAppointmentDto.specialityId,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.appointment.delete({
      where: {
        id,
      },
    });
  }
}
