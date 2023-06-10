import { Injectable } from '@nestjs/common';
import { Speciality } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';

@Injectable()
export class SpecialitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createSpecialityDto: CreateSpecialityDto): Promise<Speciality> {
    return this.prisma.speciality.create({ data: { ...createSpecialityDto } });
  }

  async findAll(): Promise<Speciality[]> {
    return this.prisma.speciality.findMany();
  }

  async findOne(id: number): Promise<Speciality> {
    return this.prisma.speciality.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateSpecialityDto: UpdateSpecialityDto,
  ): Promise<Speciality> {
    await this.prisma.speciality.update({
      where: { id },
      data: { ...updateSpecialityDto },
    });

    return this.prisma.speciality.findUnique({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.speciality.delete({ where: { id } });
  }
}
