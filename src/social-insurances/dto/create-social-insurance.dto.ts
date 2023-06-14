import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSocialInsuranceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
