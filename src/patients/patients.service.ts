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
        createdBy: {
          connect: {
            id: createdBy,
          },
        },
        socialInsurance: {
          connect: {
            id: socialInsuranceId,
          },
        },
      },
      include: {
        createdBy: true,
        socialInsurance: true,
      },
    });

    return patient;
  }

  async findAll(): Promise<Patient[]> {
    return this.prisma.patient.findMany();
  }

  async findOne(id: number): Promise<Patient> {
    return this.prisma.patient.findUnique({
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
        createdBy: { connect: { id: createdBy } },
        socialInsurance: { connect: { id: socialInsuranceId } },
      },
    });

    return this.prisma.patient.findUnique({
      include: { createdBy: true, socialInsurance: true },
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.patient.delete({ where: { id } });
  }
}
