import { Speciality } from '@prisma/client';

export class SpecialityEntity implements Speciality {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<SpecialityEntity>) {
    Object.assign(this, partial);
  }
}
