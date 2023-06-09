import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SocialInsurance } from '@prisma/client';

import { AccessTokenGuard } from 'src/auth/guards';

import { CreateSocialInsuranceDto } from './dto/create-social-insurance.dto';
import { UpdateSocialInsuranceDto } from './dto/update-social-insurance.dto';
import { SocialInsurancesService } from './social-insurances.service';

@UseGuards(AccessTokenGuard)
@Controller('social-insurances')
export class SocialInsurancesController {
  constructor(
    private readonly socialInsurancesService: SocialInsurancesService,
  ) {}

  @Post()
  create(
    @Body() createSocialInsuranceDto: CreateSocialInsuranceDto,
  ): Promise<SocialInsurance> {
    return this.socialInsurancesService.create(createSocialInsuranceDto);
  }

  @Get()
  findAll(): Promise<SocialInsurance[]> {
    return this.socialInsurancesService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSocialInsuranceDto: UpdateSocialInsuranceDto,
  ): Promise<any> {
    return this.socialInsurancesService.update(+id, updateSocialInsuranceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    const socialInsurance = await this.socialInsurancesService.findOne(+id);

    if (!socialInsurance) {
      throw new NotFoundException('Social insurance not found');
    }

    return this.socialInsurancesService.remove(+id);
  }
}
