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

import { JwtAuthGuard } from 'src/auth/guards';
import { User } from 'src/common/decorators';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { PatientsService } from './patients.service';

@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(
    @Body() createPatientDto: CreatePatientDto,
    @User() user,
  ): Promise<Patient> {
    return this.patientsService.create({
      ...createPatientDto,
      created_by: user.id,
    });
  }

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Patient> {
    const patient = await this.patientsService.findOne(+id);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const patient = await this.patientsService.findOne(+id);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return this.patientsService.remove(+id);
  }
}
