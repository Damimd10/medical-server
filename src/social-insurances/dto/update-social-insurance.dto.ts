import { PartialType } from '@nestjs/mapped-types';
import { CreateSocialInsuranceDto } from './create-social-insurance.dto';

export class UpdateSocialInsuranceDto extends PartialType(CreateSocialInsuranceDto) {}
