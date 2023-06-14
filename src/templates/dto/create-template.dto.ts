import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  templateType: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  alternativeName: string[];

  @IsNumber()
  @IsNotEmpty()
  specializationId: never;
}
