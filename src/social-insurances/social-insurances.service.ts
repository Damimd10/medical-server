import { Injectable } from '@nestjs/common';
import { CreateSocialInsuranceDto } from './dto/create-social-insurance.dto';
import { UpdateSocialInsuranceDto } from './dto/update-social-insurance.dto';

@Injectable()
export class SocialInsurancesService {
  create(createSocialInsuranceDto: CreateSocialInsuranceDto) {
    return 'This action adds a new socialInsurance';
  }

  findAll() {
    return `This action returns all socialInsurances`;
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
