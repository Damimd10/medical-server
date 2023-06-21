import { SocialInsurance } from '@prisma/client';

export class SocialInsuranceEntity implements SocialInsurance {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<SocialInsuranceEntity>) {
    Object.assign(this, partial);
  }
}
