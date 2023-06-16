import { Injectable } from '@nestjs/common';
import { SocialInsurance } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateSocialInsuranceDto } from './dto/create-social-insurance.dto';
import { UpdateSocialInsuranceDto } from './dto/update-social-insurance.dto';

@Injectable()
export class SocialInsurancesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createSocialInsuranceDto: CreateSocialInsuranceDto,
  ): Promise<SocialInsurance> {
    const newSocialInsurance = await this.prisma.socialInsurance.create({
      data: {
        name: createSocialInsuranceDto.name,
      },
    });

    return newSocialInsurance;
  }

  async findAll(): Promise<SocialInsurance[]> {
    return this.prisma.socialInsurance.findMany();
  }

  async findOne(id: number): Promise<SocialInsurance> {
    return this.prisma.socialInsurance.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateSocialInsuranceDto: UpdateSocialInsuranceDto,
  ): Promise<SocialInsurance> {
    await this.prisma.socialInsurance.update({
      where: { id },
      data: {
        name: updateSocialInsuranceDto.name,
      },
    });

    return this.prisma.socialInsurance.findUnique({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.socialInsurance.delete({ where: { id } });
  }
}
