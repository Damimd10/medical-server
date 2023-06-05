import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateSocialInsuranceDto } from './dto/create-social-insurance.dto';
import { UpdateSocialInsuranceDto } from './dto/update-social-insurance.dto';
import { SocialInsurance } from './entities/social-insurance.entity';

@Injectable()
export class SocialInsurancesService {
  constructor(
    @Inject('SOCIAL_INSURANCE_REPOSITORY')
    private socialInsuranceRepository: Repository<SocialInsurance>,
  ) {}

  async create(createSocialInsuranceDto: CreateSocialInsuranceDto) {
    const socialInsurance = new SocialInsurance();

    socialInsurance.name = createSocialInsuranceDto.name;

    await this.socialInsuranceRepository.save(socialInsurance);

    return socialInsurance;
  }

  async findAll() {
    const socialInsurances = await this.socialInsuranceRepository.find();

    return socialInsurances;
  }

  findOne(id: number) {
    return `This action returns a #${id} socialInsurance`;
  }

  update(id: number, updateSocialInsuranceDto: UpdateSocialInsuranceDto) {
    return `This action updates a #${id} socialInsurance`;
  }

  remove(id: number) {
    return `This action removes a #${id} socialInsurance`;
  }
}
