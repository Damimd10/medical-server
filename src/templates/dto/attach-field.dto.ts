import { IsNotEmpty, IsNumber } from 'class-validator';

export class AttachFieldDto {
  @IsNumber()
  @IsNotEmpty()
  fieldId: number;

  @IsNumber()
  @IsNotEmpty()
  templateId: number;
}
