import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSocialInsuranceDto } from './dto/create-social-insurance.dto';
import { UpdateSocialInsuranceDto } from './dto/update-social-insurance.dto';
import { SocialInsurancesService } from './social-insurances.service';

@Controller('social-insurances')
export class SocialInsurancesController {
  constructor(
    private readonly socialInsurancesService: SocialInsurancesService,
  ) {}

  @Post()
  create(@Body() createSocialInsuranceDto: CreateSocialInsuranceDto) {
    return this.socialInsurancesService.create(createSocialInsuranceDto);
  }

  @Get()
  findAll() {
    return this.socialInsurancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialInsurancesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSocialInsuranceDto: UpdateSocialInsuranceDto,
  ) {
    return this.socialInsurancesService.update(+id, updateSocialInsuranceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialInsurancesService.remove(+id);
  }
}
