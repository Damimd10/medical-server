import { Speciality } from '@prisma/client';

export class SpecialityEntity implements Speciality {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<SpecialityEntity>) {
    Object.assign(this, partial);
  }
}
