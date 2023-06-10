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
import { Speciality } from '@prisma/client';

import { AccessTokenGuard } from 'src/auth/guards';

import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { SpecialitiesService } from './specialities.service';

@UseGuards(AccessTokenGuard)
@Controller('specialities')
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) {}

  @Post()
  create(
    @Body() createSpecialityDto: CreateSpecialityDto,
  ): Promise<Speciality> {
    return this.specialitiesService.create(createSpecialityDto);
  }

  @Get()
  findAll(): Promise<Speciality[]> {
    return this.specialitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Speciality> {
    const speciality = this.specialitiesService.findOne(+id);

    if (!speciality) {
      throw new NotFoundException('Speciality not found');
    }

    return this.specialitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecialityDto: UpdateSpecialityDto,
  ): Promise<Speciality> {
    return this.specialitiesService.update(+id, updateSpecialityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    const speciality = this.specialitiesService.findOne(+id);

    if (!speciality) {
      throw new NotFoundException('Speciality not found');
    }

    return this.specialitiesService.remove(+id);
  }
}
