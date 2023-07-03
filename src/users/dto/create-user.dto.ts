import { Role } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname?: string;

  @IsEnum(['ADMIN', 'DOCTOR', 'PATIENT'])
  @IsOptional()
  role?: Role;

  @IsNumber({}, { each: true })
  @IsOptional()
  specialities?: number[];

  @IsNumber()
  @IsNotEmpty()
  organization_member: number[];

  @IsNumber()
  @IsOptional()
  organization_admin_id?: number;
}
