import { IsNotEmpty, IsNumber } from 'class-validator';

export class AttachTemplateDto {
  @IsNumber()
  @IsNotEmpty()
  appointmentId: number;

  @IsNumber()
  @IsNotEmpty()
  templateId: number;
}
