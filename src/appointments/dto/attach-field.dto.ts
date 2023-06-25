import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AttachFieldDto {
  @IsNumber()
  @IsNotEmpty()
  appointmentId: number;

  @IsNumber()
  @IsNotEmpty()
  fieldId: number;

  @IsString()
  @IsNotEmpty()
  value: string;
}
