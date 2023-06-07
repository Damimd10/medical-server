import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSocialInsuranceDto } from './dto/create-social-insurance.dto';
import { UpdateSocialInsuranceDto } from './dto/update-social-insurance.dto';
import { SocialInsurance } from './entities/social-insurance.entity';

@Injectable()
export class SocialInsurancesService {
  constructor(
    @InjectRepository(SocialInsurance)
    private socialInsuranceRepository: Repository<SocialInsurance>,
  ) {}

  async create(
    createSocialInsuranceDto: CreateSocialInsuranceDto,
  ): Promise<SocialInsurance> {
    const newSocialInsurance = await this.socialInsuranceRepository.create(
      createSocialInsuranceDto,
    );

    return this.socialInsuranceRepository.save(newSocialInsurance);
  }

  async findAll(): Promise<SocialInsurance[]> {
    return this.socialInsuranceRepository.find();
  }

  async findOne(id: number): Promise<SocialInsurance> {
    return this.socialInsuranceRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateSocialInsuranceDto: UpdateSocialInsuranceDto,
  ): Promise<SocialInsurance> {
    await this.socialInsuranceRepository.update(id, updateSocialInsuranceDto);

    return this.socialInsuranceRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.socialInsuranceRepository.delete(id);
  }
}
