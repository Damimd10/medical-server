import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const { socialInsuranceId, createdBy, ...patientData } = createPatientDto;

    const patient = await this.prisma.patient.create({
      data: {
        ...patientData,
        created_by: {
          connect: {
            id: createdBy,
          },
        },
        social_insurance: {
          connect: {
            id: socialInsuranceId,
          },
        },
      },
      include: {
        created_by: true,
        social_insurance: true,
      },
    });

    return patient;
  }

  async findAll(): Promise<Patient[]> {
    return this.prisma.patient.findMany({
      include: {
        social_insurance: true,
      },
    });
  }

  async findOne(id: number): Promise<Patient> {
    return this.prisma.patient.findUnique({
      include: {
        appointments: {
          include: {
            doctor: true,
            speciality: true,
          },
        },
        social_insurance: true,
      },
      where: { id },
    });
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const { socialInsuranceId, createdBy, ...patientData } = updatePatientDto;

    await this.prisma.patient.update({
      where: {
        id,
      },
      data: {
        ...patientData,
        ...(createdBy && { createdBy: { connect: { id: createdBy } } }),
        ...(socialInsuranceId && {
          socialInsurance: { connect: { id: socialInsuranceId } },
        }),
      },
    });

    return this.prisma.patient.findUnique({
      include: { created_by: true, social_insurance: true },
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.patient.delete({ where: { id } });
  }
}
