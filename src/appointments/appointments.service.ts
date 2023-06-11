import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { Appointment } from '@prisma/client';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

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
        doctor: true,
        patient: true,
        speciality: true,
      },
    });
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
        ...updateAppointmentDto,
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
