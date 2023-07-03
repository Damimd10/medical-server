import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  date: any;

  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsNumber()
  @IsNotEmpty()
  specialityId: number;

  @IsNumber()
  @IsNotEmpty()
  organizationId: number;

  @IsArray()
  @IsNotEmpty()
  fields: { fieldId: number; value: string }[];
}
