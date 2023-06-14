import { SocialInsurance } from '@prisma/client';

export class SocialInsuranceEntity implements SocialInsurance {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<SocialInsuranceEntity>) {
    Object.assign(this, partial);
  }
}
