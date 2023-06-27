import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFieldDto {
  @IsNumber()
  @IsNotEmpty()
  fieldId: number;

  @IsString()
  @IsNotEmpty()
  value: string;
}
