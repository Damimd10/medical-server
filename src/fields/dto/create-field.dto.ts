import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFieldDto {
  @IsString()
  @IsNotEmpty()
  fieldId: string;

  @IsString()
  @IsNotEmpty()
  inputType: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsOptional()
  alternativeName?: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsOptional()
  rightLabel?: string;
}
