import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpecialityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
