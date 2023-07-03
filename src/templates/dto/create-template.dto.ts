import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  alternativeName: string[];

  @IsNumber()
  @IsNotEmpty()
  specializationId: never;

  @IsString()
  description: string;
}
