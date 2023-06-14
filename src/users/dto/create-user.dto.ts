import { Role } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsEnum(['ADMIN', 'DOCTOR', 'PATIENT'])
  @IsOptional()
  role?: Role;

  @IsNumber({}, { each: true })
  specialities: number[];
}
