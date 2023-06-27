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
import { Appointment } from '@prisma/client';

import { AccessTokenGuard } from 'src/auth/guards';

import { AppointmentsService } from './appointments.service';
import { AttachFieldDto } from './dto/attach-field.dto';
import { AttachTemplateDto } from './dto/attach-template.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UpdateFieldDto } from './dto/update-fields-dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@UseGuards(AccessTokenGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Post('/attach-field')
  async attachField(@Body() attachFieldDto: AttachFieldDto) {
    return this.appointmentsService.attachField(attachFieldDto);
  }

  @Post('/attach-template')
  async attachTemplate(@Body() attachTemplateDto: AttachTemplateDto) {
    return this.appointmentsService.attachTemplate(attachTemplateDto);
  }

  @Patch('/:id/update-attached-field')
  async updateAttachedField(
    @Param('id') id: string,
    @Body() attachFieldDto: AttachFieldDto,
  ) {
    return this.appointmentsService.updateAttachedField(+id, attachFieldDto);
  }

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Appointment> {
    const appointment = await this.appointmentsService.findOne(+id);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Post(':id/templates')
  async updateTemplates(
    @Param('id') id: string,
    @Body() templates: UpdateTemplateDto[],
  ) {
    return this.appointmentsService.updateTemplates(+id, templates);
  }

  @Post(':id/fields')
  async updateFields(
    @Param('id') id: string,
    @Body() fields: UpdateFieldDto[],
  ) {
    return this.appointmentsService.updateFields(+id, fields);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const appointment = await this.appointmentsService.findOne(+id);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return this.appointmentsService.remove(+id);
  }
}
