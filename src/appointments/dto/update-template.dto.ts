import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTemplateDto {
  @IsNumber()
  @IsNotEmpty()
  templateId: number;

  @IsString()
  @IsNotEmpty()
  value: string;
}
